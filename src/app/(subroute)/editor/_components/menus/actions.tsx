"use client";
import {
  IconArrowBackUpDouble,
  IconDeviceFloppy,
  IconTrashX,
} from "@tabler/icons-react";
import { workflows } from "../../_constants/worklows";
import WorkflowButton from "../workflowButton";
import Link from "next/link";

export default function Actions() {
  return (
    <div className="flex-grow w-[27vw] flex flex-col p-5 justify-start space-y-5">
      <div className="flex flex-row justify-between items-center space-x-3">
        <h2 className="text-2xl font-semibold flex flex-grow ">
          Workflows Actions
        </h2>
        <button className="bg-neutral-900 p-2 rounded-xl border border-neutral-700">
          <IconTrashX className="text-red-600" />
        </button>
        <button className="bg-neutral-900 p-2 rounded-xl border border-neutral-700">
          <IconDeviceFloppy />
        </button>

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
      <div className="flex flex-grow flex-row items-end w-full space-x-2">
        <button className="basis-1/2 rounded-xl py-3 p-2 border-2 border-white bg-neutral-900 text-xl font-semibold text-center">
          Publish
        </button>
        <button className="basis-1/2 rounded-xl py-3 p-2 border-2 border-red-600 bg-neutral-900 text-xl font-semibold text-center">
          Deactivate
        </button>
      </div>
    </div>
  );
}
