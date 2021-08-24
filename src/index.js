(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var FUNC = 'function';
  var DEFAULT_OPTIONS = {
    template: nx.noop,
    callback: nx.stubValue,
    itemsKey: 'children'
  };

  nx.treeWalk = function (inItems, inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var itemsKey = options.itemsKey;
    var itemsGetter =
      typeof itemsKey === FUNC
        ? itemsKey
        : function (_, item) {
            return nx.get(item, itemsKey);
          };

    var walk = function (items, level) {
      var depth = level + 1;
      return items.map(function (item, index) {
        var children = itemsGetter(index, item, items);
        var cb = function () {
          return walk(children, depth);
        };
        var independent = !(children && children.length);
        var callback = independent ? nx.noop : cb;
        var target = options.callback({
          item: item,
          index: index,
          children: children,
          independent: independent,
          depth: depth
        });
        return options.template.call(this, target, callback);
      });
    };

    return walk(inItems, -1);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.treeWalk;
  }
})();
