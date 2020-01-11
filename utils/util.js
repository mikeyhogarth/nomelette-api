// small implementation of a safe 'get'
// usage: get(['my', 'prop', 'from', 'item'], item)
function get(p, o) {
  return p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);
}
module.exports.get = get;

function unique(array) {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  return array.filter(onlyUnique);
}
module.exports.unique = unique;

// A type is identifiable from its PK/SK - if they are the same,
// then that is the type. If they are different, then
module.exports.dynamoItemType = item => {
  const pk = get(["dynamodb", "Keys", "pk", "S"], item) || "";
  const sk = get(["dynamodb", "Keys", "sk", "S"], item) || "";

  const pkType = pk.slice(0, pk.indexOf("#"));
  const skType = sk.slice(0, sk.indexOf("#"));
  if (pkType === skType) return pkType;
  else return `${pkType}/${skType}`;
};
