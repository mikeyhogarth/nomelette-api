"use strict";

const {
  deleteExistingTaggings,
  addTaggingsToRecipe,
  addBookToRecipe
} = require("../services/recipe.service");

const {
  getCategoriesForStreamEvent,
  getIngredientsForStreamEvent
} = require("./recipeStreamEvent.utils");

module.exports = async recipeStreamEvent => {
  const recipeItem = recipeStreamEvent.dynamodb;
  const recipeId = recipeItem.Keys.pk.S;

  if (["INSERT", "MODIFY"].includes(recipeStreamEvent.eventName)) {
    await updateTaggings(recipeId, recipeItem, recipeStreamEvent);
  } else if (recipeStreamEvent.eventName === "REMOVE") {
    // Removed: we need to delete the taggings it had
    await deleteExistingTaggings(recipeId);
  }
};

async function updateTaggings(recipeId, recipeItem, streamEvent) {
  // extract recipe name
  const recipeName = recipeItem.NewImage.recipeName
    ? recipeItem.NewImage.recipeName.S
    : "N/A";

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

  // Write away the book tagging
  const bookId = recipeItem.NewImage.book ? recipeItem.NewImage.book.S : null;
  await addBookToRecipe(recipeId, recipeName, bookId);
}
