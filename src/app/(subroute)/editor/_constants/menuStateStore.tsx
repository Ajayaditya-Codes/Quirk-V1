// store/useMenuStore.ts
import { create } from "zustand";

// Define types for menuState and nodeState
type GithubState = {
  repo: string;
  listener: "issues" | "push";
};
type AsanaState = {
  project: {
    id: string;
    name: string;
  };
  taskName: string;
  taskNotes: string;
};
type SlackState = {
  channel: string;
  message: string;
};
type ConditionState = {
  variable: string;
  condition: ">" | "<" | "==" | "!=" | ">=" | "<=" | "has" | "not has";
  value: string;
};

type MenuState = "menu" | "github" | "asana" | "slack" | "condition";
type NodeState = GithubState | AsanaState | SlackState | ConditionState | null;

interface MenuStore {
  menuState: MenuState;
  setMenuState: (state: MenuState) => void;
  nodeState: NodeState;
  setNodeState: (state: NodeState) => void;
  repos: string[];
  setRepos: (repos: string[]) => void;
  channels: string[];
  setChannels: (channels: string[]) => void;
  projects: { id: string; name: string }[];
  setProjects: (projects: { id: string; name: string }[]) => void;
  id: string;
  setId: (id: string) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  id: "",
  setId: (id: string) => set({ id }),
  menuState: "menu",
  setMenuState: (state: MenuState) => set({ menuState: state }),
  nodeState: null,
  setNodeState: (state: NodeState) => set({ nodeState: state }),
  repos: [],
  setRepos: (repos) => set({ repos }),
  channels: [],
  setChannels: (channels) => set({ channels }),
  projects: [],
  setProjects: (projects) => set({ projects }),
}));
