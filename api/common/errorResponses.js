exports.badRequest = event => ({
  status: 400,
  body: `Not supported: ${JSON.stringify(event)}`
});
