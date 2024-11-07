import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { IconBrandAsana } from "@tabler/icons-react";
import React from "react";
import { useMenuStore } from "../menuStateStore";
import WorkflowNode from "../../_components/workflowNode";
import { useToast } from "@/hooks/use-toast";

// Define the type for AsanaNode data
type AsanaNodeData = {
  project: {
    id: string;
    name: string;
  };
  taskName: string;
  taskNotes: string;
  id: string;
};

type AsanaNode = Node<AsanaNodeData, "asana">;
type AsanaNodeProps = NodeProps<AsanaNode>;

const AsanaNode: React.FC<AsanaNodeProps> = ({ id, data }) => {
  const { project, taskName, taskNotes } = data;
  const { setNodeState, setMenuState, setProjects, setId } = useMenuStore();
  const { toast } = useToast();

  const handleWorkflow = async () => {
    try {
      const response = await fetch("/api/asana/fetcher");
      const projects: { id: string; name: string }[] = [];

      if (!response.ok) throw new Error("Failed to fetch Asana data");
      const data = await response.json();
      for (const workspace of data.data) {
        for (const project of workspace.projects) {
          projects.push({ id: project.gid, name: project.name });
        }
      }
      setProjects(projects);
    } catch (error: any) {
      console.log(error);
      toast({
        title: "There was Some Error fetching the Projects",
        variant: "destructive",
      });
    }

    setId(id);
    setMenuState("asana");
    setNodeState({
      project: project || "",
      taskName: taskName || "",
      taskNotes: taskNotes || "",
    });
  };

  return (
    <>
      <WorkflowNode
        nodeHandler={handleWorkflow}
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
