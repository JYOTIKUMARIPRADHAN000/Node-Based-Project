// store.js

// import { create } from "zustand";
// import {
//     addEdge,
//     applyNodeChanges,
//     applyEdgeChanges,
//     MarkerType,
//   } from 'reactflow';

// export const useStore = create((set, get) => ({
//     nodes: [],
//     edges: [],
//     getNodeID: (type) => {
//         const newIDs = {...get().nodeIDs};
//         if (newIDs[type] === undefined) {
//             newIDs[type] = 0;
//         }
//         newIDs[type] += 1;
//         set({nodeIDs: newIDs});
//         return `${type}-${newIDs[type]}`;
//     },
//     addNode: (node) => {
//         set({
//             nodes: [...get().nodes, node]
//         });
//     },
//     onNodesChange: (changes) => {
//       set({
//         nodes: applyNodeChanges(changes, get().nodes),
//       });
//     },
//     onEdgesChange: (changes) => {
//       set({
//         edges: applyEdgeChanges(changes, get().edges),
//       });
//     },
//     onConnect: (connection) => {
//       set({
//         edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
//       });
//     },
//     updateNodeField: (nodeId, fieldName, fieldValue) => {
//       set({
//         nodes: get().nodes.map((node) => {
//           if (node.id === nodeId) {
//             node.data = { ...node.data, [fieldName]: fieldValue };
//           }
  
//           return node;
//         }),
//       });
//     },
//   }));



// import { create } from "zustand";
// import { applyNodeChanges, applyEdgeChanges, addEdge } from "reactflow";

// export const useStore = create((set, get) => ({
//   nodes: [],
//   edges: [],

//   setNodes: (changes) =>
//     set({
//       nodes: applyNodeChanges(changes, get().nodes),
//     }),

//   setEdges: (changes) =>
//     set({
//       edges: applyEdgeChanges(changes, get().edges),
//     }),

//   onConnect: (connection) =>
//     set({
//       edges: addEdge(connection, get().edges),
//     }),
// }));


import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  // unique id per node type
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (!newIDs[type]) newIDs[type] = 0;
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  // add node (USED BY DROP)
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  // sync movement / delete
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  // sync edge changes
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  // connect edges
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
        get().edges
      ),
    });
  },

  // update node data (VERY IMPORTANT for TextNode variables)
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
          : node
      ),
    });
  },
}));
