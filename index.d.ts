interface TreeWalkOption {
  template?: any;
  callback?: any;
  itemsKey?: string | ((index: number, item: any) => any);
}

interface NxStatic {
  treeWalk: (items: any[], options?: TreeWalkOption[]) => any;
}

export default function treeWalk(items: any[], options?: TreeWalkOption[]): any;
