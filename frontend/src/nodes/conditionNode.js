import { BaseNode } from "./baseNode";

export const ConditionNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Condition"
      inputs={["value"]}
      outputs={["true", "false"]}
    >
      <div style={{ fontSize: 12 }}>
        If / Else branch
      </div>
    </BaseNode>
  );
};
