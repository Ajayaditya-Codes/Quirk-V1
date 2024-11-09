import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { IconBrandSlack } from "@tabler/icons-react";
import React from "react";
import { useMenuStore } from "../menuStateStore";
import WorkflowNode from "../../_components/workflowNode";
import { useToast } from "@/hooks/use-toast";
import { Stringifier } from "postcss";

// Define the type for SlackNode data
type SlackNodeData = {
  id: Stringifier;
  channel: string;
  message: string;
};

// Define the SlackNode type
type SlackNode = Node<SlackNodeData, "slack">;
type SlackNodeProps = NodeProps<SlackNode>;

const SlackNode: React.FC<SlackNodeProps> = ({ id, data }) => {
  const { channel, message } = data;
  const { setNodeState, setMenuState, setChannels, setId } = useMenuStore();
  const { toast } = useToast();

  const handleWorkflow = async () => {
    try {
      const response = await fetch("/api/slack/fetcher");
      const channels: string[] = [];

      if (!response.ok) throw new Error("Failed to fetch Slack data");
      const data = await response.json();
      for (const channel of data.channels) {
        channels.push(channel.name);
      }
      setChannels(channels);
    } catch (error: any) {
      console.error(error);
      toast({
        title: "There was Some Error fetching the Channels",
        variant: "destructive",
      });
    }

    setId(id);
    setMenuState("slack");
    setNodeState({
      channel: channel || "",
      message: message || "",
    });
  };

  return (
    <>
      <WorkflowNode
        nodeHandler={handleWorkflow}
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
