import * as React from 'react';

import { tree } from './TreeView.module.css';

type TreeNodeT = {
  name: string;
  id: number;
  childNodes?: TreeNodeT[];
};

type TreeNodeCallback = (item: TreeNodeT) => void;

type TreeNodeProps = {
  node: TreeNodeT;
  onChange: TreeNodeCallback;
};

const TreeNode = ({ node, onChange }: TreeNodeProps) => {
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
type TreeViewProps = {
  data: Array<TreeNodeT>;
  onChange: TreeNodeCallback;
};
const TreeView = ({ data, onChange }: TreeViewProps) => {
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
