"use strict";

const dynamodb = require("../dynamodb");

module.exports.handler = async event => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.recipeIds
    }
  };

  // fetch todo from the database
  dynamodb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      return {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch item."
      };
    }

    // create a response
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
  });
};
