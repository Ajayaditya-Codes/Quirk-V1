"use client";
import { IconArrowBackUpDouble } from "@tabler/icons-react";
import { useMenuStore } from "../../_constants/menuStateStore";
import { useState, useEffect } from "react";
import { useFlowStore } from "../../_constants/reactFlowStore";
import { toast, useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type SlackState = {
  channel: string;
  message: string;
};

// Type guard for SlackState
function isSlackState(nodeState: any): nodeState is SlackState {
  return (
    nodeState &&
    typeof nodeState.channel === "string" &&
    typeof nodeState.message === "string"
  );
}

export default function SlackMenu() {
  const { setMenuState, channels, nodeState, setNodeState, id } =
    useMenuStore();
  const { nodes, setNodes } = useFlowStore();
  const { toast } = useToast();

  const [selectedChannel, setSelectedChannel] = useState<string>(
    isSlackState(nodeState) ? nodeState.channel : channels[0]
  );
  const [message, setMessage] = useState<string>(
    isSlackState(nodeState) ? nodeState.message : ""
  );

  useEffect(() => {
    // Set the initial state when nodeState or channels change
    if (isSlackState(nodeState)) {
      setSelectedChannel(nodeState.channel);
      setMessage(nodeState.message);
    }
  }, [nodeState, channels]);

  const handleSave = () => {
    // Update node state and flow node with the new data
    setNodeState({
      channel: selectedChannel,
      message: message,
    });

    setNodes(
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                channel: selectedChannel,
                message: message,
              },
            }
          : node
      )
    );

    toast({ title: "Changes Saved" });
    setMenuState("menu");
  };

  return (
    <div className="flex-grow w-[27vw] flex flex-col p-5 justify-start space-y-5">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold ">Slack Message</h2>
        <button
          onClick={() => setMenuState("menu")}
          className="bg-neutral-900 p-2 rounded-xl border border-neutral-700"
        >
          <IconArrowBackUpDouble />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-400">
            Select Slack Channel
          </label>
          <Select onValueChange={setSelectedChannel} value={selectedChannel}>
            <SelectTrigger className="w-full mt-1 p-2 border border-neutral-700 rounded-md bg-neutral-900 text-neutral-200">
              <SelectValue placeholder="Select Channel" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white w-[25vw]">
              {channels.map((channel, index) => (
                <SelectItem key={index} value={channel}>
                  {channel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-400">
            Message
          </label>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-neutral-700 rounded-md bg-neutral-900 text-neutral-200"
          />
        </div>
      </div>

      <div className="flex flex-grow items-end">
        <button
          className="w-full p-2 rounded-lg bg-white text-black text-xl font-semibold h-fit"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
