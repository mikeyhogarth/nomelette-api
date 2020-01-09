const streamEventHandler = require("../index").handler;
const exampleStreamEvent = require("../__mocks__/streamEvent.json");
const recipeStreamEventHandler = require("../recipe.streamEvent");

jest.mock("../recipe.streamEvent");

describe("streamEvent lambda", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when passed a recipe", () => {
    it("hands recipes off to the recipe handler", async () => {
      await streamEventHandler(exampleStreamEvent);
      const calls = recipeStreamEventHandler.mock.calls[0];
      expect(calls.length).toBe(1);
      expect(calls[0]).toMatchSnapshot();
    });
  });

  describe("when passed nothing", () => {
    it("does not fall over or call the recipe stream event handler", async () => {
      await streamEventHandler({});
      await streamEventHandler(null);
      await streamEventHandler({ Records: [null, null] });
      await streamEventHandler({ Records: [null, {}] });
      expect(recipeStreamEventHandler).not.toBeCalled();
    });
  });
});
