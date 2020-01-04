const { dynamoItemType } = require("./util");

describe("dynamoItemType", () => {
  it("returns type based on PK", () => {
    const item = {
      dynamodb: {
        Keys: {
          pk: {
            S: "Foo#bar"
          }
        }
      }
    };

    expect(dynamoItemType(item)).toEqual("Foo");
  });
});
