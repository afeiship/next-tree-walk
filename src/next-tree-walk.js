(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var RETURN_VALUE = function (inValue) { return inValue; }
  var DEFAULT_OPTIONS = { template: nx.noop, callback: RETURN_VALUE };

  nx.treeWalk = function(inItems, inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var walk = function(items) {
      return items.map(function(item, index) {
        var children = item.children;
        var cb = function() { return walk(children); };
        var independent = !(children && children.length);
        var callback = independent ? nx.noop : cb;
        var target = options.callback({ item: item, index: index, independent: independent });
        return options.template.apply(this, [ target, callback ]);
      });
    };
    return walk(inItems);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.treeWalk;
  }
})();
