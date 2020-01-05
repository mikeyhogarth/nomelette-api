const dynamodb = require("../dynamodb");
const { unique } = require("../utils/util");

const TableName = process.env.DYNAMODB_TABLE;

/**
 *
 * @param {*} recipeSlug
 */
async function getRecipeById(recipeSlug) {
  const params = {
    TableName,
    Key: {
      pk: `Recipe#${recipeSlug}`,
      sk: `Recipe#${recipeSlug}`
    }
  };

  return dynamodb.get(params).promise();
}
exports.getRecipeById = getRecipeById;

/**
 *
 * @param {*} recipeId
 * @param {*} taggingType
 * @param {*} taggings
 */
async function addTaggingsToRecipe(
  recipeId,
  recipeName,
  taggingType,
  taggings
) {
  if (!taggings.length) return;

  var params = {
    RequestItems: {
      [TableName]: unique(taggings).map(tagging => ({
        PutRequest: {
          Item: {
            pk: recipeId,
            sk: `Tagging#${tagging}`,
            taggingType,
            recipeName
          }
        }
      }))
    }
  };

  return dynamodb.batchWrite(params).promise();
}
exports.addTaggingsToRecipe = addTaggingsToRecipe;

/**
 *
 * @param {*} recipeId
 */
async function deleteExistingTaggings(recipeId) {
  /**
   * Get the taggings
   */
  const getTagsParams = {
    TableName,
    KeyConditionExpression: "pk = :v1 and begins_with(sk, :v2)",
    ExpressionAttributeValues: {
      ":v1": recipeId,
      ":v2": "Tagging"
    }
  };

  const taggingQuery = await dynamodb.query(getTagsParams).promise();

  // crap out if there aren't any
  if (!taggingQuery.Items.length) return;

  // otherwise delete them all
  const deleteTagsParams = {
    RequestItems: {
      [TableName]: taggingQuery.Items.map(tagging => ({
        DeleteRequest: {
          Key: {
            pk: tagging.pk,
            sk: tagging.sk
          }
        }
      }))
    }
  };
  return dynamodb.batchWrite(deleteTagsParams).promise();
}
exports.deleteExistingTaggings = deleteExistingTaggings;
