"use client";
import { IconArrowBackUpDouble } from "@tabler/icons-react";
import { useState, useCallback } from "react";

import {
  ReactFlow,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  OnNodesChange,
  OnEdgesChange,
  type Node,
  type Edge,
  OnConnect,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { workflows } from "../_constants/worklows";
import WorkflowButton from "../_components/workflowButton";

import {
  initialNodes,
  initialEdges,
  defaultEdgeOptions,
  nodeTypes,
} from "../_constants/react-flow";

export default function Page() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-full py-5 flex flex-row space-x-5">
      <div className="border-8 w-[70vw] border-neutral-800 bg-black bg-opacity-50 rounded-md">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultEdgeOptions={defaultEdgeOptions}
          colorMode="dark"
          zoomOnPinch
          fitView
        >
          <Background //@ts-ignore
            variant="dots"
            gap={20}
            size={1}
          />{" "}
          <Controls />
        </ReactFlow>
      </div>
      <div className="flex-grow  flex flex-col p-5 justify-start space-y-5">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-semibold ">Workflows Actions</h2>
          <button className="bg-neutral-900 p-2 rounded-xl border border-neutral-700">
            <IconArrowBackUpDouble />
          </button>
        </div>
        {workflows.map((workflow, idx) => {
          return (
            <WorkflowButton
              handler={workflow.handler}
              icon={workflow.icon}
              workflowName={workflow.name}
              workflowDescription={workflow.description}
              key={idx}
              disabled={workflow.disabled}
            />
          );
        })}
      </div>
    </div>
  );
}
