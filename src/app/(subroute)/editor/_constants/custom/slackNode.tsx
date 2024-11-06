import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import WorkflowButton from "../../_components/workflowButton";
import { IconBrandSlack } from "@tabler/icons-react";
import React from "react";

// Define the type for SlackNode data
type SlackNodeData = {
  channel: string;
  text: string;
};

// Define the SlackNode type
type SlackNode = Node<SlackNodeData, "slack">;
type SlackNodeProps = NodeProps<SlackNode>;

const SlackNode: React.FC<SlackNodeProps> = ({ data }) => {
  const { channel, text } = data;

  // Handler for WorkflowButton
  const handleWorkflow = () => {
    console.log(`Sending message to Slack channel: ${channel}`);
    console.log(`Message: ${text}`);
  };

  return (
    <>
      <WorkflowButton
        handler={handleWorkflow}
        icon={<IconBrandSlack />}
        workflowName="Slack "
        workflowDescription="Send messages to Slack channel"
      />
      <Handle
        style={{ width: "12px", height: "12px" }}
        type="target"
        position={Position.Top}
      />
    </>
  );
};

export default SlackNode;
