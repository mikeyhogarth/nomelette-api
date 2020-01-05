const { getRecipeById } = require("../services/recipe.service");

module.exports.handler = async event => {
  try {
    const result = await getRecipeById(event.pathParameters.recipeId);

    if (result.Item) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "text/json" },
        body: JSON.stringify(result.Item)
      };
    } else {
      return {
        statusCode: 404,
        headers: { "Content-Type": "text/plain" },
        body: "Recipe Not Found"
      };
    }
  } catch (err) {
    return {
      statusCode: error.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "UNKNOWN ERROR"
    };
  }
};
