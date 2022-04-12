import { tree } from './TreeView.module.css';

type TreeNodeT<T> = {
  name: string;
  id: number;
  childNodes?: T[];
};

type TreeNodeCallback<T> = (item: T) => void;

type TreeNodeProps<T> = {
  node: T;
  onChange: TreeNodeCallback<T>;
};

const TreeNode = <T extends TreeNodeT<T>,>({ node, onChange }: TreeNodeProps<T>) => {
  const { name, childNodes } = node;
  if (!childNodes) {
    return <span onClick={() => onChange(node)}>{name}</span>;
  }
  return (
    <details open>
      <summary>{name}</summary>
      <ul>
        {childNodes.map((node) => {
          return (
            <li key={node.id}>
              <TreeNode node={node} onChange={onChange} />
            </li>
          );
        })}
      </ul>
    </details>
  );
};
type TreeViewProps<T> = {
  data: Array<T>;
  className?: string;
  onChange: TreeNodeCallback<T>;
};
const TreeView = <T extends TreeNodeT<T>,>({ data, onChange }: TreeViewProps<T>) => {
  return (
    <div className={tree}>
      <ul>
        {data.map((node) => {
          return (
            <li key={node.id}>
              <TreeNode node={node} onChange={onChange} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export type { TreeNodeT };

export { TreeView };
