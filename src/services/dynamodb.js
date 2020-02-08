"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

let options = {};

const isOffline = process.env.IS_OFFLINE;
const isTest = process.env.JEST_WORKER_ID;

// connect to local DB if running offline or if this is a test
if (isOffline || isTest) {
  options = {
    endpoint: "localhost:8000",
    sslEnabled: false,
    region: "local-env"
  };
}

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = client;
