import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  children,
}) => {
  return (
    <div
      style={{
        minWidth: 200,
        border: "1px solid black",
        borderRadius: 8,
        padding: 10,
        background: "white",
      }}
    >
     
      <div style={{ fontWeight: "bold", marginBottom: 8 }}>{title}</div>

      {inputs.map((input, index) => (
        <Handle
          key={input}
          type="target"
          position={Position.Left}
          id={`${id}-${input}`}
          style={{ top: 30 + index * 22 }}
        />
      ))}

      <div>{children}</div>

      {outputs.map((output, index) => (
        <Handle
          key={output}
          type="source"
          position={Position.Right}
          id={`${id}-${output}`}
          style={{ top: 30 + index * 22 }}
        />
      ))}
    </div>
  );
};
