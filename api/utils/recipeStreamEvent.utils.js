const { get } = require("./util");

exports.getCategoriesForStreamEvent = recipeStreamEvent => {
  return get(["dynamodb", "NewImage", "categories", "SS"], recipeStreamEvent);
};

exports.getIngredientsForStreamEvent = recipeStreamEvent => {
  var regex = /\*([a-zA-Z0-9 ]+)\*/g;

  const ingredientsText = get(
    ["dynamodb", "NewImage", "ingredients", "S"],
    recipeStreamEvent
  );

  return ingredientsText.match(regex).map(i =>
    i
      .substring(1, i.length - 1)
      .toLowerCase()
      .replace(" ", "-")
  );
};
