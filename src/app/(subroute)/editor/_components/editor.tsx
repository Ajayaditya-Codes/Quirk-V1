"use client";
import { useCallback, useEffect, useState } from "react";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  Panel,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useFlowStore } from "../_constants/reactFlowStore";
import { useToast } from "@/hooks/use-toast";
import { useMenuStore } from "../_constants/menuStateStore";
import { IconTrashX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function Editor() {
  const path = usePathname();
  const slug = path?.split("/").pop();

  const { toast } = useToast();
  const {
    nodes,
    edges,
    nodeTypes,
    edgeOptions,
    setNodes,
    setEdges,
    addNewEdge,
  } = useFlowStore();
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const { setMenuState } = useMenuStore();

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

  const onEdgeClick = useCallback((event: any, edge: any) => {
    setSelectedNode(null); // Clear selected node
    setSelectedEdge(edge); // Store the selected edge
  }, []);
  const onNodeClick = useCallback((event: any, node: any) => {
    setSelectedNode(node); // Clear selected node
    setSelectedEdge(null); // Store the selected edge
  }, []);

  const handleDeleteEdge = () => {
    if (selectedEdge) {
      const updatedEdges = edges.filter(
        (el: Edge) => el.id !== selectedEdge.id
      );
      setEdges(updatedEdges);
      setSelectedEdge(null);
    }
  };
  const handleDeleteNode = () => {
    if (selectedNode?.id !== "github-1") {
      const updatedNodes = nodes.filter(
        (el: Node) => el.id !== selectedNode?.id
      );
      const updatedEdges = edges.filter(
        (el: Edge) =>
          el.source !== selectedNode?.id && el.target !== selectedNode?.id
      );
      setNodes(updatedNodes);
      setEdges(updatedEdges);
    } else {
      toast({
        title: "Cannot delete the GitHub Node",
        variant: "destructive",
      });
    }
    setSelectedNode(null);
    setMenuState("menu");
  };
  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        const response = await fetch(`/api/workflow/get?workflowName=${slug}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        console.log(data.Edges);
        console.log(data.Nodes);
        setNodes(data.Nodes);
        setEdges(data.Edges);
      } catch (error: any) {
        toast({
          title: "There was Some Error Fetching the Workflow",
          variant: "destructive",
        });
      }
    };

    fetchWorkflow();
  }, []);

  return (
    <div className="border-8 w-[70vw] h-full border-neutral-800 bg-black bg-opacity-50 rounded-md">
      <ReactFlow //@ts-ignore
        fitView
        nodes={nodes}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={edgeOptions}
        colorMode="dark"
        zoomOnPinch
        snapToGrid
      >
        <Background //@ts-ignore
          variant="dots"
          gap={20}
          size={1}
        />
        <Controls />
        <Panel position="top-right">
          <button
            className={`bg-neutral-900 border-red-500 border flex-row space-x-2 w-fit p-3  text-xl font-semibold rounded-xl ${
              selectedEdge === null ? "hidden" : " flex"
            }`}
            onClick={handleDeleteEdge} // Delete the edge on click
          >
            <IconTrashX className="text-red-500" />
            <p>Delete Edge</p>{" "}
          </button>
          <button
            className={`bg-neutral-900 border-red-500 border flex-row space-x-2 w-fit p-3  text-xl font-semibold rounded-xl ${
              selectedNode === null ? "hidden" : " flex"
            }`}
            onClick={handleDeleteNode} // Delete the edge on click
          >
            <IconTrashX className="text-red-500" />
            <p>Delete Node</p>{" "}
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
