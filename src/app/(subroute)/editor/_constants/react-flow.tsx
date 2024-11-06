import { type Node, type Edge, DefaultEdgeOptions } from "@xyflow/react";
import GitHubNode from "./custom/githubNode";
import AsanaNode from "./custom/asanaNode";
import SlackNode from "./custom/slackNode";
import ConditionNode from "./custom/conditionNode";

export const initialNodes: AppNodes[] = [
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
    position: { x: 600, y: 400 }, // Position of the Asana node
  },
];

export const initialEdges: Edge[] = [];

export const defaultEdgeOptions: DefaultEdgeOptions = {
  deletable: true,
  type: "smoothstep",
  style: {
    stroke: "white",
  },
  animated: true,
};

export const nodeTypes = {
  github: GitHubNode,
  asana: AsanaNode,
  slack: SlackNode,
  condition: ConditionNode,
};

export type AppNodes =
  | GitHubNode
  | AsanaNode
  | SlackNode
  | ConditionNode
  | Node;
