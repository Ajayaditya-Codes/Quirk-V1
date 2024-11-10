"use client";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  IconBrandAsana,
  IconBrandGithub,
  IconBrandSlack,
  IconBrandTrello,
  IconCopy,
  IconEditCircle,
} from "@tabler/icons-react";
import { useToast } from "@/hooks/use-toast";
import { generate } from "random-words";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  name: string;
};

export default function WorkflowCard({ name }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const join = (strings: string[] | string) => {
    let result = "";
    for (const string of strings) {
      result += string[0].toUpperCase() + string.slice(1);
      result += "-";
    }
    return result.slice(0, -1);
  };

  const handler = async () => {
    const workflowName = join(generate(3));

    try {
      const response = await fetch("/api/workflow/duplicate", {
        method: "POST",
        body: JSON.stringify({ workflow: name, newWorkflow: workflowName }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        toast({ title: "Workflow Added Successfully" });
        router.refresh();
      } else if (result.error === "Maximum number of workflows reached") {
        toast({
          title: "Workflow Limit Reached. ",
          description: "You can only have 3 Workflows in Hobby Plan.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "There was some Error. Try Again Later!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to Duplicate Workflow:", error);
      toast({ title: "Failed to Duplicate Workflow", variant: "destructive" });
    }
  };
  return (
    <Card className="flex w-full items-end space-x-2  bg-black text-white border border-white">
      <CardHeader className="flex flex-col flex-grow gap-4 ">
        <div className="flex flex-row gap-2">
          <IconBrandGithub />
          <IconBrandSlack />
          <IconBrandAsana />
          <IconBrandTrello />
        </div>
        <div>
          <CardTitle className="text-lg mt-5">{name} Workflow</CardTitle>
          <CardDescription>Automate Your Github Workflow</CardDescription>
        </div>
      </CardHeader>
      <button
        onClick={handler}
        className="bg-neutral-900 border border-white p-2 m-5 rounded-lg flex flex-row items-center gap-2 "
      >
        <IconCopy />
        Duplicate Workflow
      </button>
      <Link href={`/editor/${name}`}>
        <button className="bg-neutral-900 border border-white p-2 m-5 rounded-lg flex flex-row items-center gap-2 ">
          <IconEditCircle />
          Edit Workflow
        </button>
      </Link>
    </Card>
  );
}
