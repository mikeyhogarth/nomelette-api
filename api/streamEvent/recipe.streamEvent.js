"use strict";

const {
  deleteExistingTaggings,
  addTaggingsToRecipe
} = require("../services/recipe.service");

const {
  getCategoriesForStreamEvent,
  getIngredientsForStreamEvent
} = require("../utils/recipeStreamEvent.utils");

module.exports = async recipeStreamEvent => {
  const item = recipeStreamEvent.dynamodb;
  const recipeId = item.Keys.pk.S;
  const recipeName = item.NewImage.recipeName
    ? item.NewImage.recipeName.S
    : "N/A";

  if (["INSERT", "MODIFY"].includes(recipeStreamEvent.eventName)) {
    // Updated: we need to update the taggings
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
