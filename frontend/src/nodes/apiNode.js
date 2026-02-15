import { useState } from "react";
import { BaseNode } from "./baseNode";

export const APINode = ({ id }) => {
  const [url, setUrl] = useState("");

  return (
    <BaseNode
      id={id}
      title="API"
      inputs={["params"]}
      outputs={["response"]}
    >
      <input
        type="text"
        placeholder="https://api.com"
        value={url}
        onChange={(e)=>setUrl(e.target.value)}
        style={{ width: "100%" }}
      />
    </BaseNode>
  );
};
