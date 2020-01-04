"use strict";
const { dynamoItemType } = require("../util");

const recipeStreamEventHandler = require("./recipe.streamEvent");

module.exports.handler = async event => {
  const records = (event || {}).Records || [];

  records.forEach(record => {
    switch (dynamoItemType(record)) {
      case "Recipe":
        return recipeStreamEventHandler(record);
    }
  });
};
