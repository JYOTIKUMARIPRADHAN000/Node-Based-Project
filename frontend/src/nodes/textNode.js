// textNode.js
import { useState, useEffect, useMemo, useRef } from "react";
import { BaseNode } from "./baseNode";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [text]);

  const variables = useMemo(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const found = new Set();

    let match;
    while ((match = regex.exec(text))) {
      found.add(match[1]);
    }

    return [...found];
  }, [text]);

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={variables}  
      outputs={["output"]}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type text... use {{variable}}"
        style={{
          width: "100%",
          resize: "none",
          overflow: "hidden",
          minHeight: 40
        }}
      />
    </BaseNode>
  );
};
