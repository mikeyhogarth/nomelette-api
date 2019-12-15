const categories = require("./categories.json");

exports.getCategory = async categoryId => {
  const category = categories.find(c => c.id === categoryId);

  if (!category) {
    return {
      statusCode: 404,
      body: "Unknown Category"
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...category,
      recipes: [] // this'll go off and get recipes from the DB
    })
  };
};

exports.getCategories = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(categories)
  };
};
