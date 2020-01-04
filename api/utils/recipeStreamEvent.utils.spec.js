const recipeStreamEvent = require("../streamEvent/tests/recipeStreamEvent.json");
const {
  getCategoriesForStreamEvent,
  getIngredientsForStreamEvent
} = require("./recipeStreamEvent.utils");

describe("getCategoriesForStreamEvent", () => {
  it("extracts the categories from the object", () => {
    expect(getCategoriesForStreamEvent(recipeStreamEvent)).toEqual([
      "starters",
      "summer",
      "soups"
    ]);
  });
});

describe("getIngredientsForStreamEvent", () => {
  it("extracts the ingredients from the object", () => {
    expect(getIngredientsForStreamEvent(recipeStreamEvent)).toEqual([
      "butter",
      "peas",
      "lettuce",
      "spring-onions",
      "sugar",
      "chicken-stock",
      "cream",
      "parsley",
      "mint"
    ]);
  });
});
