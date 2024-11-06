import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import WorkflowButton from "../../_components/workflowButton";
import { IconBrandAsana } from "@tabler/icons-react";
import React from "react";

// Define the type for AsanaNode data
type AsanaNodeData = {
  project: string;
  taskName: string;
  taskNotes: string;
};

// Define the AsanaNode type
type AsanaNode = Node<AsanaNodeData, "asana">;
type AsanaNodeProps = NodeProps<AsanaNode>;

const AsanaNode: React.FC<AsanaNodeProps> = ({ data }) => {
  const { project, taskName, taskNotes } = data;

  // Handler for WorkflowButton
  const handleWorkflow = () => {
    console.log(`Creating task in Asana project: ${project}`);
    console.log(`Task: ${taskName}`);
    console.log(`Notes: ${taskNotes}`);
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
