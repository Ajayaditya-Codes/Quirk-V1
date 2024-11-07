import {
  type Node,
  type Edge,
  DefaultEdgeOptions,
  addEdge,
} from "@xyflow/react";
import GitHubNode from "./custom/githubNode";
import AsanaNode from "./custom/asanaNode";
import SlackNode from "./custom/slackNode";
import ConditionNode from "./custom/conditionNode";
import { create } from "zustand";

type FlowState = {
  nodes: Node[];
  edges: Edge[];
  edgeOptions: DefaultEdgeOptions;
  nodeTypes: {
    github: typeof GitHubNode;
    asana: typeof AsanaNode;
    slack: typeof SlackNode;
    condition: typeof ConditionNode;
  };
  addNode: (node: Node) => void;
  removeNode: (nodeId: string) => void;
  addEdge: (edge: Edge) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNewEdge: (connection: any) => void;

  githubHandler: () => void;
  slackHandler: () => void;
  asanaHandler: () => void;
  conditionHandler: () => void;
};

// Initialize the store
export const useFlowStore = create<FlowState>((set) => ({
  nodes: [
    {
      id: "github-1",
      type: "github",
      data: {
        repoName: "",
        listenerType: "issues",
      },
      position: { x: 0, y: 0 }, // Position of the GitHub node
    },
  ],
  edges: [],
  edgeOptions: {
    deletable: true,
    type: "smoothstep",
    style: { stroke: "white" },
    animated: true,
  },
  nodeTypes: {
    github: GitHubNode,
    asana: AsanaNode,
    slack: SlackNode,
    condition: ConditionNode,
  },

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  removeNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
    })),

  addEdge: (edge) =>
    set((state) => ({
      edges: [...state.edges, edge],
    })),

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  addNewEdge: (connection) =>
    set((state) => {
      const updatedEdges = addEdge(connection, state.edges); // Add the new edge
      return { edges: updatedEdges }; // Update edges with the new array
    }),
  githubHandler: () => {
    const newNode: Node = {
      id: `github-${Math.random().toString(36).slice(2, 9)}`,
      type: "github",
      data: {
        repoName: "",
        listenerType: "",
      },
      position: {
        x: Math.floor(Math.random() * 600) - 300, // Random x between -1000 and 1000
        y: Math.floor(Math.random() * 600) - 300, // Random y between -1000 and 1000
      },
    };
    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },

  slackHandler: () => {
    const newNode: Node = {
      id: `slack-${Math.random().toString(36).slice(2, 9)}`,
      type: "slack",
      data: {
        channel: "",
        message: "",
      },
      position: {
        x: Math.floor(Math.random() * 600) - 300,
        y: Math.floor(Math.random() * 600) - 300,
      },
    };
    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },

  asanaHandler: () => {
    const newNode: Node = {
      id: `asana-${Math.random().toString(36).slice(2, 9)}`,
      type: "asana",
      data: {
        project: "",
        taskName: "",
        taskNotes: "",
      },
      position: {
        x: Math.floor(Math.random() * 600) - 300,
        y: Math.floor(Math.random() * 600) - 300,
      },
    };
    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },

  conditionHandler: () => {
    const newNode: Node = {
      id: `condition-${Math.random().toString(36).slice(2, 9)}`,
      type: "condition",
      data: {
        variable: "",
        condition: "",
        value: "",
      },
      position: {
        x: Math.floor(Math.random() * 600) - 300,
        y: Math.floor(Math.random() * 600) - 300,
      },
    };
    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },
}));
