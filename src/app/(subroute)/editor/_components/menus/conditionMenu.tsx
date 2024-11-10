"use client";
import React from "react";
import { IconArrowBackUpDouble } from "@tabler/icons-react";
import { useMenuStore } from "../../_constants/menuStateStore";
import { useState, useEffect } from "react";
import { useFlowStore } from "../../_constants/reactFlowStore";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { GithubVariables } from "../../_constants/githubVariables";

// Define the ConditionNodeData type
type ConditionNodeData = {
  variable: string;
  condition: ">" | "<" | "==" | "!=" | ">=" | "<=" | "has" | "not has";
  value: string;
};

// Type guard for ConditionNodeData
function isConditionState(nodeState: any): nodeState is ConditionNodeData {
  return (
    nodeState &&
    typeof nodeState.variable === "string" &&
    ["<", ">", "==", "!=", ">=", "<=", "has", "not has"].includes(
      nodeState.condition
    ) &&
    typeof nodeState.value === "string"
  );
}

export default function ConditionMenu() {
  const { setMenuState, nodeState, setNodeState, id } = useMenuStore();
  const { nodes, setNodes } = useFlowStore();
  const { toast } = useToast();

  // Initialize state for condition data (variable, condition, value)
  const [variable, setVariable] = useState<string>(
    isConditionState(nodeState) ? nodeState.variable : ""
  );
  const [condition, setCondition] = useState<ConditionNodeData["condition"]>(
    isConditionState(nodeState) ? nodeState.condition : "=="
  );
  const [value, setValue] = useState<string>(
    isConditionState(nodeState) ? nodeState.value : ""
  );

  useEffect(() => {
    // Set the initial state when nodeState changes
    if (isConditionState(nodeState)) {
      setVariable(nodeState.variable);
      setCondition(nodeState.condition);
      setValue(nodeState.value);
    }
  }, [nodeState]);

  const handleSave = () => {
    // Update node state and flow node with the new data
    setNodeState({
      variable: variable,
      condition: condition,
      value: value,
    });

    setNodes(
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                variable: variable,
                condition: condition,
                value: value,
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
        <h2 className="text-2xl font-semibold ">Condition</h2>
        <button
          onClick={() => setMenuState("menu")}
          className="bg-neutral-900 p-2 rounded-xl border border-neutral-700"
        >
          <IconArrowBackUpDouble />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-md font-medium text-neutral-400">
            Variable
          </label>
          <Select
            value={variable}
            onValueChange={(value) => setVariable(value)}
          >
            <SelectTrigger className="w-full mt-1 p-2 border text-md border-neutral-700 rounded-md bg-neutral-900 text-neutral-200">
              <SelectValue placeholder="Select Variable" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white w-[25vw]">
              {GithubVariables.map((variable) => (
                <SelectItem key={variable} value={variable}>
                  {variable}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-md font-medium text-neutral-400">
            Condition
          </label>
          <Select
            value={condition}
            onValueChange={(value) =>
              setCondition(value as ConditionNodeData["condition"])
            }
          >
            <SelectTrigger className="w-full mt-1 p-2 border text-md border-neutral-700 rounded-md bg-neutral-900 text-neutral-200">
              <SelectValue placeholder="Select Condition" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white w-[25vw]">
              {["<", ">", "==", "!=", ">=", "<=", "has", "not has"].map(
                (condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-md font-medium text-neutral-400">
            Value
          </label>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border text-md border-neutral-700 rounded-md bg-neutral-900 text-neutral-200"
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
