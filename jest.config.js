require("dotenv").config({
  path: "./.env.test"
});

module.exports = {
  preset: "@shelf/jest-dynamodb"
};
