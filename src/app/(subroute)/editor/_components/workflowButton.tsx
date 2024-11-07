"use client";

import { IconLockAccess } from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import { useFlowStore } from "../_constants/reactFlowStore";
import { useToast } from "@/hooks/use-toast";

type WorkflowButtonProps = {
  icon: ReactNode;
  workflowName: string;
  workflowDescription: string;
  disabled?: boolean;
};

const WorkflowButton: FC<WorkflowButtonProps> = ({
  icon,
  workflowName,
  workflowDescription,
  disabled,
}) => {
  const { slackHandler, asanaHandler, conditionHandler } = useFlowStore();
  const { toast } = useToast();

  const handler = (name: string) => {
    switch (name) {
      case "GitHub":
        toast({
          title: "Hooby Plan Supports only one Github Node",
          variant: "destructive",
        });
        break;
      case "Slack":
        slackHandler();
        break;
      case "Asana":
        asanaHandler();
        break;
      case "Condition":
        conditionHandler();
        break;
      case "Trello":
        toast({ title: "Coming Soon!" });
      default:
        break;
    }
  };
  return (
    <button
      className="bg-neutral-900 rounded-xl w-full items-center p-5 flex flex-row space-x-5 border-white border"
      onClick={() => handler(workflowName)}
    >
      {icon}
      <div className="flex flex-col justify-start items-start">
        <h5 className="text-lg font-semibold">{workflowName}</h5>
        <p className="text-gray-400">{workflowDescription}</p>
      </div>
      {disabled && (
        <div className="flex flex-grow items-end justify-end h-full">
          <IconLockAccess />
        </div>
      )}
    </button>
  );
};

export default WorkflowButton;
