import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import WorkflowButton from "../../_components/workflowButton";
import React from "react";
import { GitBranch } from "lucide-react";
import { useMenuStore } from "../menuStateStore";

type ConditionNodeData = {
  variable: string;
  condition: ">" | "<" | "==" | "!=" | ">=" | "<=";
  value: string;
};

// Define the ConditionNode type
type ConditionNode = Node<ConditionNodeData, "condition">;
type ConditionNodeProps = NodeProps<ConditionNode>;

const ConditionNode: React.FC<ConditionNodeProps> = ({ data }) => {
  const { variable, condition, value } = data;
  const { menuState, setMenuState, nodeState, setNodeState } = useMenuStore();

  // Handler for WorkflowButton
  const handleWorkflow = () => {
    setMenuState("condition");
    setNodeState({
      variable: variable || "",
      condition: condition || "==",
      value: value || "",
    });
  };

  return (
    <>
      <WorkflowButton
        handler={handleWorkflow}
        icon={<GitBranch />}
        workflowName="Condition"
        workflowDescription="Apply Conditional Logic to Control Trigger Flow"
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{ width: "12px", height: "12px" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ width: "12px", height: "12px" }}
      />
    </>
  );
};

export default ConditionNode;
