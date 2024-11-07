"use client";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { IconBrandGithub } from "@tabler/icons-react";
import React from "react";
import { useMenuStore } from "../menuStateStore";
import WorkflowNode from "../../_components/workflowNode";
import { useToast } from "@/hooks/use-toast";

type GitHubNodeData = {
  repoName: string | null;
  listenerType: "issues" | "push" | null;
  id: string;
};

type GitHubNode = Node<GitHubNodeData, "github">;
type GitHubNodeProps = NodeProps<GitHubNode>;

const GitHubNode: React.FC<GitHubNodeProps> = ({ id, data }) => {
  const { repoName, listenerType } = data;
  const { setNodeState, setMenuState, setRepos, setId } = useMenuStore();
  const { toast } = useToast();

  const handleWorkflow = async () => {
    try {
      const response = await fetch("/api/github/fetchRepos");
      const repos: string[] = [];

      if (!response.ok) throw new Error("Failed to fetch GitHub data");
      const data = await response.json();
      repos.push(...data.map((repo: any) => repo.full_name)); // Extract repo names
      setRepos(repos);
    } catch (error) {
      console.error(error);
      toast({ title: "Error fetching repositories", variant: "destructive" });
    }

    setId(id); // Pass node ID to menu state
    setMenuState("github"); // Set menu to GitHub
    setNodeState({
      repo: repoName || "", // Default to empty if null
      listener: listenerType || "issues", // Default listener
    });
  };

  return (
    <>
      <WorkflowNode
        nodeHandler={handleWorkflow}
        icon={<IconBrandGithub />}
        workflowName="GitHub Listener"
        workflowDescription="Listen for GitHub Events"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ width: "12px", height: "12px" }}
      />
    </>
  );
};

export default GitHubNode;
