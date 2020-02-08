const dynamodb = require("../../services/dynamodb");
const { handler } = require("./get");

const TableName = "nomelette.co.uk";

const Item = {
  pk: "Recipe#ham-and-cheese-savoury-slices",
  sk: "Recipe#ham-and-cheese-savoury-slices",
  recipeName: "Ham and Cheese Savoury Slices",
  categories: ["autumn", "buffets-and-picnics"],
  cookingTime: "20-25 minutes",
  description: "<p>blah blah blah</p>",
  footnote: "<p>this is a footnote;</p>\r\n",
  ingredients: "these are the ingredients\n",
  method: "this is a method",
  preparationTime: "20 minutes"
};

describe("when the recipe is in the database", () => {
  it("should retrieve the recipe", async () => {
    await dynamodb.put({ TableName, Item }).promise();

    const event = {
      pathParameters: {
        recipeId: "ham-and-cheese-savoury-slices"
      }
    };

    const result = await handler(event);

    expect(result.statusCode).toEqual(200);

    expect(result.headers).toEqual({
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*"
    });

    expect(JSON.parse(result.body)).toEqual(Item);
  });
});

describe("when the recipe is not in the database", () => {
  it("returns an appropriate status code / message", async () => {
    const event = {
      pathParameters: {
        recipeId: "flobalob"
      }
    };

    const result = await handler(event);

    expect(result.statusCode).toEqual(404);

    expect(result.headers).toEqual({
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*"
    });

    expect(result.body).toEqual(JSON.stringify("Recipe Not Found"));
  });
});
