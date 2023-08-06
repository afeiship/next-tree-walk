import nx from '@jswork/next';

const FUNC = 'function';
const defaults = {
  template: nx.noop,
  callback: nx.stubValue,
  itemsKey: 'children'
};

nx.treeWalk = function (inItems, inOptions) {
  const options = nx.mix(null, defaults, inOptions);
  const itemsKey = options.itemsKey;
  const itemsGetter =
    typeof itemsKey === FUNC
      ? itemsKey
      : function (_, item) {
          return nx.get(item, itemsKey);
        };

  const walk = function (items, level) {
    const depth = level + 1;
    return items.map(function (item, index) {
      const children = itemsGetter(index, item, items);
      const cb = () => walk(children, depth);
      const independent = !(children && children.length);
      const callback = independent ? nx.noop : cb;
      const target = options.callback({
        item,
        index,
        children,
        independent,
        depth
      });
      return options.template.call(this, target, callback);
    });
  };

  return walk(inItems, -1);
};

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.treeWalk;
}

export default nx.treeWalk;
