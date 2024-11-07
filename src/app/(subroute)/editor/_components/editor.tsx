"use client";
import { useCallback } from "react";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Controls,
  EdgeChange,
  NodeChange,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useFlowStore } from "../_constants/reactFlowStore";

export default function Editor() {
  // Access state and actions from Zustand store
  const {
    nodes,
    edges,
    nodeTypes,
    edgeOptions,
    setNodes,
    setEdges,
    addNewEdge,
  } = useFlowStore();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      setNodes(updatedNodes); // directly set updatedNodes
    },
    [nodes, setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      setEdges(updatedEdges); // directly set updatedEdges
    },
    [edges, setEdges]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      addNewEdge(connection); // Use the store's method to add a new edge
    },
    [addNewEdge]
  );

  return (
    <div className="border-8 w-[70vw] h-full border-neutral-800 bg-black bg-opacity-50 rounded-md">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={edgeOptions}
        colorMode="dark"
        zoomOnPinch
        fitView
      >
        <Background //@ts-ignore
          variant="dots"
          gap={20}
          size={1}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}
