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
    await updateRecipe(recipeId, recipeStreamEvent);
  }
};

async function updateRecipe(recipeId, streamEvent) {
  // delete all existing taggings
  await deleteExistingTaggings(recipeId);

  // write away the ingredients
  await addTaggingsToRecipe(
    recipeId,
    "ingredient",
    getIngredientsForStreamEvent(streamEvent)
  );
  // write away the categories
  await addTaggingsToRecipe(
    recipeId,
    "category",
    getCategoriesForStreamEvent(streamEvent)
  );
}
