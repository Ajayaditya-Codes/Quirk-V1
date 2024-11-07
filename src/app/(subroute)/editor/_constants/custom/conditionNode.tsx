import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import React from "react";
import { GitBranch } from "lucide-react";
import { useMenuStore } from "../menuStateStore";
import WorkflowNode from "../../_components/workflowNode";

type ConditionNodeData = {
  variable: string;
  condition: ">" | "<" | "==" | "!=" | ">=" | "<=";
  value: string;
  id: string;
};

// Define the ConditionNode type
type ConditionNode = Node<ConditionNodeData, "condition">;
type ConditionNodeProps = NodeProps<ConditionNode>;

const ConditionNode: React.FC<ConditionNodeProps> = ({ id, data }) => {
  const { variable, condition, value } = data;
  const { setNodeState, setMenuState, setId } = useMenuStore();

  const handleWorkflow = () => {
    setId(id);
    setMenuState("condition");
    setNodeState({
      variable: variable || "",
      condition: condition || "==",
      value: value || "",
    });
  };

  return (
    <>
      <WorkflowNode
        nodeHandler={handleWorkflow}
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
