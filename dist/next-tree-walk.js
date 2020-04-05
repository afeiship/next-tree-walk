/*!
 * name: @feizheng/next-tree-walk
 * description: Tree data walker.
 * url: https://github.com/afeiship/next-tree-walk
 * version: 1.0.5
 * date: 2020-04-05 23:39:44
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  /* prettier-ignore */
  var RETURN_VALUE = function (inValue) { return inValue; };
  var FUNC = 'function';
  var DEFAULT_OPTIONS = {
    template: nx.noop,
    callback: RETURN_VALUE,
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

//# sourceMappingURL=next-tree-walk.js.map
