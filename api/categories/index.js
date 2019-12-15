const { getCategory, getCategories } = require("./service");
const { badRequest } = require("../common/errorResponses");

exports.handler = async event => {
  if (!event.httpMethod === "GET") {
    return badRequest(event);
  }

  const categoryId = event.pathParameters && event.pathParameters.categoryId;
  return categoryId ? getCategory(categoryId) : getCategories();
};
