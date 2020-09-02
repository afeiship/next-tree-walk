/*!
 * name: @feizheng/next-tree-walk
 * description: Tree data walker.
 * homepage: https://github.com/afeiship/next-tree-walk
 * version: 1.0.6
 * date: 2020-09-02T11:09:05.445Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
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
            return item[itemsKey];
          };

    var walk = function (items) {
      return items.map(function (item, index) {
        var children = itemsGetter(index, item, items);
        var cb = function () {
          return walk(children);
        };
        var independent = !(children && children.length);
        var callback = independent ? nx.noop : cb;
        var target = options.callback({
          item: item,
          index: index,
          parent: items,
          independent: independent
        });
        return options.template.call(this, target, callback);
      });
    };

    return walk(inItems);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.treeWalk;
  }
})();
