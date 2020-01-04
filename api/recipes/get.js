const dynamodb = require("../dynamodb");
const TableName = process.env.DYNAMODB_TABLE;

module.exports.handler = async event => {
  const params = {
    TableName,
    Key: {
      id: event.pathParameters.recipeId
    }
  };

  try {
    const result = dynamodb.get(params);
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
  } catch (err) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't fetch item."
    };
  }
};
