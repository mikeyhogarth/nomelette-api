const { getRecipeById } = require("../../services/recipe.service");
const { success, notFound, failure } = require("../response");

module.exports.handler = async event => {
  try {
    const result = await getRecipeById(event.pathParameters.recipeId);

    if (result.Item) {
      return success(result.Item);
    } else {
      return notFound("Recipe Not Found");
    }
  } catch (err) {
    return failure("UNKNOWN ERROR");
  }
};
