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

// Define types
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
        repoName: "openai/xyflow",
        listenerType: "issues",
      },
      position: { x: 0, y: 0 }, // Position of the GitHub node
    },
    {
      id: "slack-1",
      type: "slack",
      data: {
        channel: "#general",
        text: "Hello, everyone! This is a test message from React Flow.",
      },
      position: { x: -200, y: -200 }, // Position of the Slack node
    },
    {
      id: "slack-2",
      type: "slack",
      data: {
        channel: "#development",
        text: "React Flow integration is awesome! #workflow",
      },
      position: { x: 200, y: 200 }, // Position of the Slack node
    },
    {
      id: "asana-1",
      type: "asana",
      data: {
        project: "Marketing Campaign",
        taskName: "Design New Logo",
        taskNotes:
          "Create a new logo design for the fall campaign. Use the new brand colors and incorporate the latest trends.",
      },
      position: { x: -400, y: -450 }, // Position of the Asana node
    },
    {
      id: "asana-2",
      type: "asana",
      data: {
        project: "Product Launch",
        taskName: "Write Blog Post",
        taskNotes:
          "Write an engaging blog post about the upcoming product launch. Include the key features and benefits.",
      },
      position: { x: 400, y: 400 }, // Position of the Asana node
    },
    {
      id: "condition-1",
      type: "condition",
      data: { variable: "issue", condition: "==", value: "Good First Issue" },
      position: { x: 600, y: 600 }, // Position of the Asana node
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
        repoName: "example/repo",
        listenerType: "issues",
      },
      position: {
        x: Math.floor(Math.random() * 2000) - 1000, // Random x between -1000 and 1000
        y: Math.floor(Math.random() * 2000) - 1000, // Random y between -1000 and 1000
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
        channel: "general",
        text: "Test Slack message.",
      },
      position: {
        x: Math.floor(Math.random() * 2000) - 1000,
        y: Math.floor(Math.random() * 2000) - 1000,
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
        project: "Example Project",
        taskName: "Example Task",
        taskNotes: "This is an example task in Asana.",
      },
      position: {
        x: Math.floor(Math.random() * 2000) - 1000,
        y: Math.floor(Math.random() * 2000) - 1000,
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
        variable: "issue",
        condition: "==",
        value: "Good First Issue",
      },
      position: {
        x: Math.floor(Math.random() * 2000) - 1000,
        y: Math.floor(Math.random() * 2000) - 1000,
      },
    };
    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },
}));
