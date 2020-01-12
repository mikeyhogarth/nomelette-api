const { getRecipesByTag } = require("../../services/recipe.service");

module.exports.handler = async event => {
  try {
    const result = await getRecipesByTag(event.pathParameters.tagId);

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify(result.Items)
    };
  } catch (err) {
    return {
      statusCode: error.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "UNKNOWN ERROR"
    };
  }
};
