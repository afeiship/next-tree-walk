require('../src');

const items = require('./fixtures/menu.json');
const items2 = require('./fixtures/menu2.json');

describe('api.basic test', () => {
  test('nx.treeWalk comman case:', function () {
    let html = '';
    nx.treeWalk(items, {
      template: ({ item, independent, level }, cb) => {
        console.log(level);
        html += `<li>${item.label}</li>`;
        cb();
      }
    });

    expect(html).toBe(
      '<li>Menu1</li><li>Menu1-1</li><li>Menu-1-1</li><li>Menu-1-2</li><li>Menu2</li><li>-</li><li>Menu3</li>'
    );
  });

  test('nx.treeWalk itemsKey:', function () {
    let html = '';
    nx.treeWalk(items2, {
      itemsKey: (index, item) => {
        return item.children || item.data;
      },
      template: ({ item }, cb) => {
        html += `<li>${item.label}</li>`;
        cb();
      }
    });

    expect(html).toBe(
      '<li>Menu1</li><li>Menu1-1</li><li>Menu-1-1</li><li>Menu-1-2</li><li>Menu2</li><li>-</li><li>Menu3</li>'
    );
  });
});
