module.exports = async () => {
  const serverless = new (require("serverless"))();
  await serverless.init();
  const service = await serverless.variables.populateService();
  const resources = service.resources[0].Resources;

  const tables = Object.keys(resources)
    .map(name => resources[name])
    .filter(r => r.Type === "AWS::DynamoDB::Table")
    .map(r => r.Properties);

  // Add StreamEnabled for tests (causes error if added for real deploys)
  // See https://gitter.im/serverless/serverless?at=59a993009acddb2407f19f40
  tables.forEach(table => {
    if (table.StreamSpecification) {
      table.StreamSpecification.StreamEnabled = true;
    }
  });

  return {
    tables,
    port: 8000
  };
};
