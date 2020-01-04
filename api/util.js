// small implementation of a safe 'get'
// usage: get(['my', 'prop', 'from', 'item'], item)
function get(p, o) {
  return p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);
}

// A type is identifiable from its PK
module.exports.dynamoItemType = item => {
  const pk = get(["dynamodb", "Keys", "pk", "S"], item) || "";
  return pk.slice(0, pk.indexOf("#"));
};
