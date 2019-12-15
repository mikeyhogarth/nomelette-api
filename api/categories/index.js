const categories = require("./categories.json");

exports.handler = async (event, context) => {
  const categoryId = event.pathParameters && event.pathParameters.categoryId;

  switch (event.httpMethod) {
    case "GET":
      return categoryId ? getCategory(categoryId) : getCategories();
    case "DELETE":
    case "POST":
    case "PUT":
      return { statusCode: 501 }; // not implemented yet
    default:
      return {
        statusCode: 400,
        body: `Not supported: ${JSON.stringify(event)}`
      };
  }
};

async function getCategory(categoryId) {
  const category = categories.find(c => c.id === categoryId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...category,
      recipes: [] // this'll go off and get recipes from the DB
    })
  };
}

async function getCategories() {
  return {
    statusCode: 200,
    body: JSON.stringify(categories)
  };
}
