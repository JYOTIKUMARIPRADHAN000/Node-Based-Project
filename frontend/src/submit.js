// submit.js

import { useStore } from "./store";

export const SubmitButton = () => {

  const handleSubmit = async () => {
    const { nodes, edges } = useStore.getState();

    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nodes: nodes,
          edges: edges
        })
      });

      const result = await response.json();
      console.log({result});

      alert(
`Pipeline Analysis

Number of Nodes: ${result.num_nodes}
Number of Edges: ${result.num_edges}
Is DAG: ${result.is_dag ? "Yes ✅" : "No ❌"}`
      );

    } catch (error) {
      alert("Backend not running or CORS error");
      console.error(error);
    }
  };

  return (
    <div style={{display:'flex', justifyContent:'center', marginTop:20}}>
      <button onClick={handleSubmit}>
        Submit Pipeline
      </button>
    </div>
  );
};



// import { useReactFlow } from "reactflow";

// export const SubmitButton = () => {
//   const { getNodes, getEdges } = useReactFlow();

//   const handleSubmit = async () => {
//     const nodes = getNodes();
//     const edges = getEdges();

//     try {
//       const res = await fetch("http://127.0.0.1:8000/pipelines/parse", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           nodes: nodes,
//           edges: edges,
//         }),
//       });

//       const data = await res.json();

//       alert(
//         `Nodes: ${data.num_nodes}
// Edges: ${data.num_edges}
// Is DAG: ${data.is_dag}`,
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Backend not reachable");
//     }
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
//       <button onClick={handleSubmit}>Submit Pipeline</button>
//     </div>
//   );
// };
