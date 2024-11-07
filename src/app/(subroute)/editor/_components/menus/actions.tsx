"use client";
import { IconArrowBackUpDouble } from "@tabler/icons-react";
import { workflows } from "../../_constants/worklows";
import WorkflowButton from "../workflowButton";
import Link from "next/link";

export default function Actions() {
  return (
    <div className="flex-grow w-[27vw] flex flex-col p-5 justify-start space-y-5">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold ">Workflows Actions</h2>
        <Link
          className="bg-neutral-900 p-2 rounded-xl border border-neutral-700"
          href={"/workflows"}
        >
          <IconArrowBackUpDouble />
        </Link>
      </div>
      {workflows &&
        workflows.map((workflow, idx) => {
          return (
            <WorkflowButton
              icon={workflow.icon}
              workflowName={workflow.name}
              workflowDescription={workflow.description}
              key={idx}
              disabled={workflow.disabled}
            />
          );
        })}
    </div>
  );
}
