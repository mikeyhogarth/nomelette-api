const { getRecipesByTag } = require("../../services/recipe.service");
const { success, failure } = require("../response");

module.exports.handler = async event => {
  try {
    const result = await getRecipesByTag(event.pathParameters.tagId);
    return success(result.Items);
  } catch (err) {
    return failure("UNKNOWN ERROR");
  }
};
