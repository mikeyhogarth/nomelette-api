// small implementation of a safe 'get'
// usage: get(['my', 'prop', 'from', 'item'], item)
function get(p, o) {
  return p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);
}
module.exports.get = get;

// A type is identifiable from its PK/SK
module.exports.dynamoItemType = item => {
  const pk = get(["dynamodb", "Keys", "pk", "S"], item) || "";
  const sk = get(["dynamodb", "Keys", "sk", "S"], item) || "";

  const pkType = pk.slice(0, pk.indexOf("#"));
  const skType = pk.slice(0, sk.indexOf("#"));
  if (pkType === skType) return pkType;
  else return `${pkType}/${skType}`;
};
