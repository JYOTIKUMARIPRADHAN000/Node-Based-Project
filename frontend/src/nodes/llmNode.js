import { BaseNode } from "./baseNode";

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={["system", "prompt"]}
      outputs={["response"]}
    >
      <div>This is a LLM.</div>
    </BaseNode>
  );
};
