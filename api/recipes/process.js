"use strict";

/**
 * Post processing tasks include;
 *
 * - Tagging from the ingredient text block
 * - Indexing into some kind of search?
 *
 * unclear at the moment whether this is the kind of thing that should
 * be split accross several lambdas or just all done in one to save on
 * calls.
 *
 */

const dynamodb = require("../dynamodb");

module.exports.handler = async event => {
  // TODO
};
