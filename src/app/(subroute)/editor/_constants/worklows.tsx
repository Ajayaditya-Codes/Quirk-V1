import {
  IconBrandGithub,
  IconBrandSlack,
  IconBrandAsana,
  IconBrandTrello,
} from "@tabler/icons-react";
import { ReactNode } from "react";
import { GitBranch } from "lucide-react";

type Workflow = {
  name: string;
  icon: ReactNode;
  description: string;
  handler: () => void;
  disabled?: boolean;
};

export const workflows: Workflow[] = [
  {
    name: "GitHub",
    icon: <IconBrandGithub />,
    description: "Listen for GitHub Events",
    handler: () => console.log("hello"),
    disabled: true,
  },
  {
    name: "Slack",
    icon: <IconBrandSlack />,
    description: "Send Message to Slack Channel",
    handler: () => console.log("hello"),
  },
  {
    name: "Asana",
    icon: <IconBrandAsana />,
    description: "Add Task to Asana Project",
    handler: () => console.log("hello"),
  },
  {
    name: "Trello",
    icon: <IconBrandTrello />,
    description: "Add Task to Trello Project",
    handler: () => console.log("hello"),
  },
  {
    name: "Condition",
    icon: <GitBranch />,
    description: "Apply Conditional Logic to Control Trigger Flow",
    handler: () => console.log("hello"),
  },
];
