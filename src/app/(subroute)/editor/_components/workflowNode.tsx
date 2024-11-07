"use client";

import { IconLockAccess } from "@tabler/icons-react";
import { FC, ReactNode } from "react";

type WorkflowButtonProps = {
  icon: ReactNode;
  workflowName: string;
  workflowDescription: string;
  disabled?: boolean;
  nodeHandler?: () => void;
};

const WorkflowNode: FC<WorkflowButtonProps> = ({
  icon,
  workflowName,
  workflowDescription,
  disabled,
  nodeHandler,
}) => {
  return (
    <button
      className="bg-neutral-900 rounded-xl w-full items-center p-5 flex flex-row space-x-5 border-white border"
      onClick={nodeHandler}
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

export default WorkflowNode;
