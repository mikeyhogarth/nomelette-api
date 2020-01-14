const { getRecipesByTag } = require("../../services/recipe.service");
const { success, failure } = require("../response");

module.exports.handler = async event => {
  try {
    const result = await getRecipesByTag(event.pathParameters.tagId);
    return success(result.Items.map(taggingResponse));
  } catch (err) {
    return failure("UNKNOWN ERROR");
  }
};

function taggingResponse(item) {
  // TODO: this is all probably reusable - refactor
  const { pk, sk } = item;
  const recipeSlug = pk.slice(pk.indexOf("#") + 1);
  const taggingSlug = sk.slice(sk.indexOf("#") + 1);

  return {
    ...item,
    taggingSlug,
    recipeSlug
  };
}
