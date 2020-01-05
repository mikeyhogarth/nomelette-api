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
  const recipeId = recipeStreamEvent.dynamodb.Keys.pk.S;

  if (["INSERT", "MODIFY"].includes(recipeStreamEvent.eventName)) {
    // Updated: we need to update the taggings
    await updateTaggings(recipeId, recipeStreamEvent);
  } else if (recipeStreamEvent.eventName === "REMOVE") {
    // Removed: we need to delete the taggings it had
    await deleteExistingTaggings(recipeId);
  }
};

async function updateTaggings(recipeId, streamEvent) {
  // delete all existing taggings
  await deleteExistingTaggings(recipeId);

  // write away the ingredient taggings
  await addTaggingsToRecipe(
    recipeId,
    "ingredient",
    getIngredientsForStreamEvent(streamEvent)
  );
  // write away the category taggings
  await addTaggingsToRecipe(
    recipeId,
    "category",
    getCategoriesForStreamEvent(streamEvent)
  );
}
