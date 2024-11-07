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

// Define the AsanaNodeData type
type AsanaNodeData = {
  project: {
    id: string;
    name: string;
  };
  taskName: string;
  taskNotes: string;
  id: string;
};

type Project = {
  id: string;
  name: string;
};

// Type guard for AsanaNodeData
function isAsanaState(nodeState: any): nodeState is AsanaNodeData {
  return (
    nodeState &&
    typeof nodeState.taskName === "string" &&
    typeof nodeState.taskNotes === "string"
  );
}

export default function AsanaMenu() {
  const { setMenuState, projects, nodeState, setNodeState, id } =
    useMenuStore();
  const { nodes, setNodes } = useFlowStore();
  const { toast } = useToast();

  // Initialize state for Asana data (project, task name, task notes)
  const [selectedProject, setSelectedProject] = useState<Project>(
    isAsanaState(nodeState) ? nodeState.project : projects[0]
  );
  const [taskName, setTaskName] = useState<string>(
    isAsanaState(nodeState) ? nodeState.taskName : ""
  );
  const [taskNotes, setTaskNotes] = useState<string>(
    isAsanaState(nodeState) ? nodeState.taskNotes : ""
  );

  useEffect(() => {
    // Set the initial state when nodeState or projects change
    if (isAsanaState(nodeState)) {
      setSelectedProject(nodeState.project);
      setTaskName(nodeState.taskName);
      setTaskNotes(nodeState.taskNotes);
    }
  }, [nodeState, projects]);

  const handleSave = () => {
    // Update node state and flow node with the new data
    setNodeState({
      project: selectedProject,
      taskName: taskName,
      taskNotes: taskNotes,
    });

    setNodes(
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                project: selectedProject,
                taskName: taskName,
                taskNotes: taskNotes,
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
        <h2 className="text-2xl font-semibold ">Asana Task</h2>
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
            Select Project
          </label>
          <Select
            onValueChange={(value) => {
              // Find the project by name
              const selectedProject = projects.find(
                (project) => project.name === value
              );
              if (selectedProject) {
                setSelectedProject(selectedProject);
              }
            }}
            value={selectedProject.name} // Use project name as value
          >
            <SelectTrigger className="w-full mt-1 p-2 border border-neutral-700 rounded-md bg-neutral-900 text-neutral-200">
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white w-[25vw]">
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.name}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-400">
            Task Name
          </label>
          <Input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-2 border border-neutral-700 rounded-md bg-neutral-900 text-neutral-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-400">
            Task Notes
          </label>
          <Input
            value={taskNotes}
            onChange={(e) => setTaskNotes(e.target.value)}
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
