import { useState } from "react";
import { BaseNode } from "./baseNode";

export const DelayNode = ({ id }) => {
  const [seconds, setSeconds] = useState(1);

  return (
    <BaseNode
      id={id}
      title="Delay"
      inputs={["input"]}
      outputs={["output"]}
    >
      <label style={{ fontSize: 12 }}>
        Seconds:
        <input
          type="number"
          value={seconds}
          min={0}
          onChange={(e)=>setSeconds(e.target.value)}
          style={{ width: "60px", marginLeft: 5 }}
        />
      </label>
    </BaseNode>
  );
};
