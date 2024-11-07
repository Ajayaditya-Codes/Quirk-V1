"use client";

import { IconArrowBackUpDouble } from "@tabler/icons-react";
import { useMenuStore } from "../../_constants/menuStateStore";
import { useFlowStore } from "../../_constants/reactFlowStore";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type GitHubState = {
  repo: string;
  listener: "issues" | "push";
};

function isGitHubState(nodeState: any): nodeState is GitHubState {
  return (
    nodeState &&
    typeof nodeState.repo === "string" &&
    (nodeState.listener === "issues" || nodeState.listener === "push")
  );
}

export default function GithubMenu() {
  const { toast } = useToast();
  const { setMenuState, repos, nodeState, setNodeState, id } = useMenuStore();
  const { nodes, setNodes } = useFlowStore();
  const [selectedRepo, setSelectedRepo] = useState(
    isGitHubState(nodeState) ? nodeState.repo : repos[0]
  );
  const [selectedListener, setSelectedListener] = useState<"issues" | "push">(
    isGitHubState(nodeState) ? nodeState.listener : "issues"
  );

  useEffect(() => {
    if (isGitHubState(nodeState)) {
      setSelectedRepo(nodeState.repo || repos[0]);
      setSelectedListener(nodeState.listener || "issues");
    }
  }, [nodeState, repos]);

  const handleSave = () => {
    setNodeState({
      repo: selectedRepo,
      listener: selectedListener,
    });

    setNodes(
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                repoName: selectedRepo,
                listenerType: selectedListener,
              },
            }
          : node
      )
    );

    toast({ title: "Changes saved successfully" });
    setMenuState("menu");
  };

  return (
    <div className="flex-grow w-[27vw] flex flex-col p-5 justify-start space-y-5">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold">GitHub Listener</h2>
        <button
          onClick={() => setMenuState("menu")}
          className="bg-neutral-900 p-2 rounded-xl border border-neutral-700"
        >
          <IconArrowBackUpDouble />
        </button>
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-400">
            Select Repository
          </label>
          <Select onValueChange={setSelectedRepo} defaultValue={selectedRepo}>
            <SelectTrigger className="w-full mt-1 p-2 border border-neutral-700 rounded-md bg-neutral-900 text-neutral-200">
              <SelectValue placeholder="Select repository" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white w-[25vw]">
              {repos.map((repo, index) => (
                <SelectItem key={index} value={repo}>
                  {repo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-400">
            Select Listener Type
          </label>
          <Select
            onValueChange={(value) =>
              setSelectedListener(value as "issues" | "push")
            }
            defaultValue={selectedListener}
          >
            <SelectTrigger className="w-full mt-1 p-2 border border-neutral-700 rounded-md bg-neutral-900 text-neutral-200">
              <SelectValue placeholder="Select listener type" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
              <SelectItem value="push">Push</SelectItem>
              <SelectItem value="issues">Issues</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
      <div className="flex flex-grow items-end">
        <button
          className="w-full p-2 flex py-3 text-xl justify-center bg-white text-black rounded-xl font-semibold"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
