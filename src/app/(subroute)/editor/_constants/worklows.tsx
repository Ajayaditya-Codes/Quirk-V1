import {
  IconBrandGithub,
  IconBrandSlack,
  IconBrandAsana,
  IconBrandTrello,
} from "@tabler/icons-react";
import { ReactNode } from "react";
import { GitBranch } from "lucide-react";
import { useFlowStore } from "./reactFlowStore";

type Workflow = {
  name: string;
  icon: ReactNode;
  description: string;
  disabled?: boolean;
};

export const workflows: Workflow[] = [
  {
    name: "GitHub",
    icon: <IconBrandGithub />,
    description: "Listen for GitHub Events",
    disabled: true,
  },
  {
    name: "Slack",
    icon: <IconBrandSlack />,
    description: "Send Message to Slack Channel",
  },
  {
    name: "Asana",
    icon: <IconBrandAsana />,
    description: "Add Task to Asana Project",
  },
  {
    name: "Trello",
    icon: <IconBrandTrello />,
    description: "Add Task to Trello Project",
  },
  {
    name: "Condition",
    icon: <GitBranch />,
    description: "Apply Conditional Logic to Control Trigger Flow",
  },
];
