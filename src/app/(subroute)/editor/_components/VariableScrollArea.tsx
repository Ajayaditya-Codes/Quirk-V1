import { ScrollArea } from "@/components/ui/scroll-area";
import VariableButton from "./variableButton";
import { GithubVariables } from "../_constants/githubVariables";

export default function VariableScrollArea({
  onClick,
}: {
  onClick: (variable: string) => void;
}) {
  return (
    <ScrollArea className="flex  w-full rounded-xl border bg-neutral-900 border-neutral-600 p-4">
      {GithubVariables.map((variable, idx) => (
        <VariableButton
          key={idx}
          onClick={() => onClick(variable)}
          variable={variable}
        />
      ))}
    </ScrollArea>
  );
}
