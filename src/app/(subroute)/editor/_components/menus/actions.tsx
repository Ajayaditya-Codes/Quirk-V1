"use client";
import {
  IconArrowBackUpDouble,
  IconDeviceFloppy,
  IconTrashX,
} from "@tabler/icons-react";
import { workflows } from "../../_constants/worklows";
import WorkflowButton from "../workflowButton";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useReactFlow } from "@xyflow/react";
import { useFlowStore } from "../../_constants/reactFlowStore";

export default function Actions() {
  const path = usePathname();
  const router = useRouter();
  const slug = path?.split("/").pop();
  const { toast } = useToast();
  const { nodes, edges } = useFlowStore();

  const deleteHandler = async () => {
    try {
      const response = await fetch("/api/workflow/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workflowName: slug }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Failed to Delete Workflow",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Workflow Deleted Successfully",
      });

      router.push("/workflows");
    } catch (error) {
      toast({ title: "Failed to Delete the Workflow", variant: "destructive" });
    }
  };
  const deactivateHandler = async () => {
    try {
      const response = await fetch("/api/workflow/deactivate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workflowName: slug }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Failed to Deactivate the Workflow",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Workflow Deactivated Successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to Deactivate the Workflow",
        variant: "destructive",
      });
    }
  };
  const updater = async (publish: boolean) => {
    let githubData = nodes[0];
    for (const node of nodes) {
      if (node.id === "github-1") {
        githubData = node;
      }
    }
    try {
      const response = await fetch("/api/workflow/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workflowName: slug,
          nodes: nodes,
          edges: edges,
          githubData: nodes[0],
          publish: publish,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: `Failed to ${publish ? "Publish" : "Save"} the Workflow`,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: `Workflow ${publish ? "Published" : "Saved"} Successfully`,
      });
    } catch (error) {
      toast({
        title: `Failed to ${publish ? "Publish" : "Save"} the Workflow`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-grow w-[27vw] flex flex-col p-5 justify-start space-y-5">
      <div className="flex flex-row justify-between items-center space-x-3">
        <h2 className="text-2xl font-semibold flex flex-grow ">
          Workflows Actions
        </h2>
        <button
          onClick={deleteHandler}
          className="bg-neutral-900 p-2 rounded-xl border border-neutral-700"
        >
          <IconTrashX className="text-red-600" />
        </button>
        <button
          onClick={() => updater(false)}
          className="bg-neutral-900 p-2 rounded-xl border border-neutral-700"
        >
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
        <button
          onClick={() => updater(true)}
          className="basis-1/2 rounded-xl py-3 p-2 border-2 border-white bg-neutral-900 text-xl font-semibold text-center"
        >
          Publish
        </button>
        <button
          onClick={deactivateHandler}
          className="basis-1/2 rounded-xl py-3 p-2 border-2 border-red-600 bg-neutral-900 text-xl font-semibold text-center"
        >
          Deactivate
        </button>
      </div>
    </div>
  );
}
