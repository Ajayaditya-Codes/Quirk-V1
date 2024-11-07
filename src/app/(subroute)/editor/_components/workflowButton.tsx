"use client";

import { IconLockAccess } from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import { useFlowStore } from "../_constants/reactFlowStore";

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
  const { githubHandler, slackHandler, asanaHandler, conditionHandler } =
    useFlowStore();

  const handler = (name: string) => {
    switch (name) {
      case "GitHub":
        githubHandler();
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
      default:
        break;
    }
  };
  return (
    <button
      className="bg-neutral-900 rounded-xl w-full items-center p-5 flex flex-row space-x-5 border-white border"
      onClick={() => handler(workflowName)}
      disabled={disabled || false}
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
