import { BaseNode } from "./baseNode";

export const MergeNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Merge"
      inputs={["input1", "input2", "input3"]}
      outputs={["merged"]}
    >
      <div style={{ fontSize: 12 }}>
        Combines inputs
      </div>
    </BaseNode>
  );
};
