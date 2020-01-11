"use strict";

const {
  deleteExistingTaggings,
  addTaggingsToRecipe
} = require("../services/recipe.service");

const {
  getCategoriesForStreamEvent,
  getIngredientsForStreamEvent
} = require("./recipeStreamEvent.utils");

module.exports = async recipeStreamEvent => {
  const item = recipeStreamEvent.dynamodb;
  const recipeId = item.Keys.pk.S;

  if (["INSERT", "MODIFY"].includes(recipeStreamEvent.eventName)) {
    // Updated: we need to update the taggings
    const recipeName = item.NewImage.recipeName
      ? item.NewImage.recipeName.S
      : "N/A";
    await updateTaggings(recipeId, recipeName, recipeStreamEvent);
  } else if (recipeStreamEvent.eventName === "REMOVE") {
    // Removed: we need to delete the taggings it had
    await deleteExistingTaggings(recipeId);
  }
};

async function updateTaggings(recipeId, recipeName, streamEvent) {
  // delete all existing taggings
  await deleteExistingTaggings(recipeId);

  // write away the ingredient taggings
  await addTaggingsToRecipe(
    recipeId,
    recipeName,
    "ingredient",
    getIngredientsForStreamEvent(streamEvent)
  );
  // write away the category taggings
  await addTaggingsToRecipe(
    recipeId,
    recipeName,
    "category",
    getCategoriesForStreamEvent(streamEvent)
  );
}
