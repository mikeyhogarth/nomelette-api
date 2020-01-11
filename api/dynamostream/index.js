"use strict";
const { dynamoItemType } = require("../api/utils/util");

const recipeStreamEventHandler = require("./recipe.streamEvent");

module.exports.handler = event => {
  const records = (event || {}).Records || [];

  try {
    records.forEach(async record => {
      const recordType = dynamoItemType(record);
      switch (recordType) {
        case "Recipe":
          recipeStreamEventHandler(record);
          break;
      }
    });
  } catch (err) {
    console.error(err);
  }
};
