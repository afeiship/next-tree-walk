# next-tree-walk
> Tree data walker.

## installation
```bash
npm install -S @feizheng/next-tree-walk
```

## usage
```jsx
import '@feizheng/next-tree-walk';

class MyComponent extends React.Component{
  get childView(){
    const { items, itemsKey, template } = this.props;
    return nx.treeWalk(items, { template, 'children' });
  }

  render(){
    return (
      <div>
        {this.childView}
      </div>
    )
  }
}
```
