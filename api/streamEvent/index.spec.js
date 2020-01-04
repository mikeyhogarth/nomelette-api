const streamEventHandler = require("./index").handler;
const recipeAddedStreamEvent = require("./tests/recipeAdded.json");
const recipeStreamEventHandler = require("./recipe.streamEvent");
jest.mock("./recipe.streamEvent");

describe("streamEvent lambda", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when passed a recipe", () => {
    it("hands recipes off to the recipe handler", async () => {
      await streamEventHandler(recipeAddedStreamEvent);
      expect(recipeStreamEventHandler).toBeCalled();
    });
  });
  describe("when not passed a recipe", () => {
    it("does not call the recipe stream event handler", async () => {
      await streamEventHandler({});
      expect(recipeStreamEventHandler).not.toBeCalled();
    });
  });
});
