import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import WorkflowButton from "../../_components/workflowButton";
import { IconBrandGithub } from "@tabler/icons-react";
import React from "react";
import { useMenuStore } from "../menuStateStore";

type GitHubNodeData = {
  repoName: string;
  listenerType: "issues" | "push";
};

type GitHubNode = Node<GitHubNodeData, "github">;
type GitHubNodeProps = NodeProps<GitHubNode>;

const GitHubNode: React.FC<GitHubNodeProps> = ({ data }) => {
  const { repoName, listenerType } = data;
  const { menuState, setMenuState, nodeState, setNodeState } = useMenuStore();

  const handleWorkflow = () => {
    setMenuState("github");
    setNodeState({
      repo: repoName || "",
      listener: listenerType || "issues",
    });
  };

  return (
    <>
      <WorkflowButton
        handler={handleWorkflow}
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
