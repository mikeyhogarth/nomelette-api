const recipeStreamEventHandler = require("../recipe.streamEvent");
const recipeInsertMock = require("../__mocks__/recipeInsertEvent.json");
const recipeRemoveMock = require("../__mocks__/recipeRemoveEvent.json");

const {
  deleteExistingTaggings,
  addTaggingsToRecipe
} = require("../../services/recipe.service");

jest.mock("../../services/recipe.service");

describe("recipeStreamEvent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("when sent an insert event", () => {
    it("removes the old taggings and adds the two types", async () => {
      await recipeStreamEventHandler(recipeInsertMock);
      expect(deleteExistingTaggings.mock.calls.length).toBe(1);
      expect(addTaggingsToRecipe.mock.calls.length).toBe(2);
    });
  });
  describe("when sent an remove event", () => {
    it("deletes the existing taggings", async () => {
      await recipeStreamEventHandler(recipeRemoveMock);
      expect(deleteExistingTaggings.mock.calls.length).toBe(1);
      expect(addTaggingsToRecipe.mock.calls.length).toBe(0);
    });
  });
});
