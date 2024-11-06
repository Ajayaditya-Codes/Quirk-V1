"use client";
import { useToast } from "@/hooks/use-toast";
import { IconCodePlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { generate } from "random-words";

type Props = {
  bgDisabled: boolean;
};

export default function WorkflowButton({ bgDisabled }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const handle = async () => {
    const workflowName = join(generate(3));
    try {
      const response = await fetch("/api/create-workflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newWorkflowName: workflowName }),
      });
      const result = await response.json();

      if (response.ok) {
        toast({ title: "Workflow Added Successfully" });
        router.refresh();
      } else if (result.error === "Maximum number of workflows reached") {
        toast({
          title: "Workflow limit reached. ",
          description: "You can only have 3 workflows in Hobby Plan.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "There was some Error. Try Again Later!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to add workflow:", error);
      toast({
        title: "There was some Error. Try Again Later!",
        variant: "destructive",
      });
    }
  };

  const join = (strings: string[] | string) => {
    let result = "";
    for (const string of strings) {
      result += string[0].toUpperCase() + string.slice(1);
      result += "-";
    }
    return result.slice(0, -1);
  };
  return (
    <button
      className={`w-12 h-12 rounded-lg flex justify-center items-center  ${
        bgDisabled ? "bg-transparent" : "bg-neutral-800"
      }`}
    >
      <IconCodePlus onClick={async () => handle()} />
    </button>
  );
}
