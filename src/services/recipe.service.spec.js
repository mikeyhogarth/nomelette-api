const dynamodb = require("./dynamodb");

const {
  getRecipeById,
  getRecipesByTag,
  addTaggingsToRecipe,
  getTaggingsForRecipe,
  deleteExistingTaggings,
  addBookToRecipe,
  getBooksForRecipe
} = require("./recipe.service");

const TableName = "nomelette.co.uk";

const recipe = {
  pk: "Recipe#toast",
  sk: "Recipe#toast",
  recipeName: "Toast",
  categories: ["autumn", "buffets-and-picnics"],
  cookingTime: "20-25 minutes",
  description: "<p>blah blah blah</p>",
  footnote: "<p>this is a footnote;</p>\r\n",
  ingredients: "these are the ingredients\n",
  method: "this is a method",
  preparationTime: "20 minutes"
};

beforeEach(async () => {
  await dynamodb.put({ TableName, Item: recipe }).promise();
});

afterEach(async () => {
  await dynamodb
    .delete({
      TableName,
      Key: {
        pk: recipe.pk,
        sk: recipe.sk
      }
    })
    .promise();
  await deleteExistingTaggings(recipe.pk);
});

describe("getRecipeById", () => {
  it("should retrieve the recipe if it exists", async () => {
    const result = await getRecipeById("toast");
    expect(result).toEqual({ Item: recipe });
  });
});

describe("getTaggingsForRecipe/addTaggingsToRecipe", () => {
  it("retrieves the taggings for a given recipe", async () => {
    const taggings = ["foobar"];

    await addTaggingsToRecipe(
      recipe.pk,
      recipe.recipeName,
      "category",
      taggings
    );

    const recipeTaggings = await getTaggingsForRecipe(recipe.pk);

    expect(recipeTaggings.Count).toEqual(1);
    expect(recipeTaggings.Items[0].sk).toEqual("Tagging#foobar");
    expect(recipeTaggings.Items[0].taggingType).toEqual("category");
    expect(recipeTaggings.Items[0].pk).toEqual(recipe.pk);
  });
});

describe("getRecipeByTag", () => {
  it("returns the tagged recipe", async () => {
    const tag = "flobalob";

    await addTaggingsToRecipe(recipe.pk, recipe.recipeName, "category", [
      [tag]
    ]);

    const recipes = await getRecipesByTag(tag);

    expect(recipes.Count).toEqual(1);
    expect(recipes.Items[0].pk).toEqual(recipe.pk);
  });
});

describe("deleteExistingTaggings", () => {
  it("gets rid of any taggings on the recipe", async () => {
    const taggings = ["foo", "bar"];
    await addTaggingsToRecipe(
      recipe.pk,
      recipe.recipeName,
      "category",
      taggings
    );

    await deleteExistingTaggings(recipe.pk);

    const taggingItems = await getTaggingsForRecipe(recipe.pk);

    expect(taggingItems.Count).toEqual(0);
  });
});

describe("addBookToRecipe/getBooksForRecipe", () => {
  it("gets the books for a particular recipe", async () => {
    const bookSlug = "cooking-is-awesome";
    await addBookToRecipe(recipe.pk, recipe.recipeName, bookSlug);

    const recipeBooks = await getBooksForRecipe(recipe.pk);

    expect(recipeBooks.Count).toEqual(1);
    expect(recipeBooks.Items[0].sk).toEqual(`Book#${bookSlug}`);
  });
});
