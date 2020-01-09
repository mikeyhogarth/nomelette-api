const { dynamoItemType, unique } = require("../util");

describe("dynamoItemType", () => {
  describe("when PK/SK are the same", () => {
    it("returns type based on PK/SK", () => {
      const item = {
        dynamodb: {
          Keys: {
            pk: {
              S: "Foo#bar"
            },
            sk: {
              S: "Foo#bar"
            }
          }
        }
      };

      expect(dynamoItemType(item)).toEqual("Foo");
    });
  });
});

describe("unique", () => {
  it("uniqueifies arrays", () => {
    const array = ["a", "a", "b", "c", "c", "d"];
    expect(unique(array)).toEqual(["a", "b", "c", "d"]);
  });
});
