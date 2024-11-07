import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import WorkflowButton from "../../_components/workflowButton";
import { IconBrandAsana } from "@tabler/icons-react";
import React from "react";
import { useMenuStore } from "../menuStateStore";

// Define the type for AsanaNode data
type AsanaNodeData = {
  project: string;
  taskName: string;
  taskNotes: string;
};

type AsanaNode = Node<AsanaNodeData, "asana">;
type AsanaNodeProps = NodeProps<AsanaNode>;

const AsanaNode: React.FC<AsanaNodeProps> = ({ data }) => {
  const { project, taskName, taskNotes } = data;
  const { menuState, setMenuState, nodeState, setNodeState } = useMenuStore();

  const handleWorkflow = () => {
    setMenuState("asana");
    setNodeState({
      projectId: project || "",
      taskName: taskName || "",
      taskNotes: taskNotes || "",
    });
  };

  return (
    <>
      <WorkflowButton
        handler={handleWorkflow}
        icon={<IconBrandAsana />}
        workflowName="Asana"
        workflowDescription="Add Task to Asana Project"
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{ width: "12px", height: "12px" }}
      />
    </>
  );
};

export default AsanaNode;
