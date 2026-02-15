import { BaseNode } from "./baseNode";

export const MathNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Math"
      inputs={["a", "b"]}
      outputs={["result"]}
    >
      <div style={{ fontSize: 12 }}>
        Adds A + B
      </div>
    </BaseNode>
  );
};
