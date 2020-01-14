exports.success = function(body) {
  return buildResponse(200, body);
};

exports.notFound = function(body) {
  return buildResponse(404, body);
};

exports.failure = function(body) {
  return buildResponse(500, body);
};

function buildResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
}
