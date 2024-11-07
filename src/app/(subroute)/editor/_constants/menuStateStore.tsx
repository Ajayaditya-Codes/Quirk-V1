// store/useMenuStore.ts
import { create } from "zustand";

// Define types for menuState and nodeState
type GithubState = {
  repo: string;
  listener: "issues" | "push";
};
type AsanaState = {
  projectId: string;
  taskName: string;
  taskNotes: string;
};
type SlackState = {
  channel: string;
  message: string;
};
type ConditionState = {
  variable: string;
  condition: ">" | "<" | "==" | "!=" | ">=" | "<=";
  value: string;
};

type MenuState = "menu" | "github" | "asana" | "slack" | "condition";
type NodeState = GithubState | AsanaState | SlackState | ConditionState | null;

interface MenuStore {
  menuState: MenuState;
  setMenuState: (state: MenuState) => void;
  nodeState: NodeState;
  setNodeState: (state: NodeState) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  menuState: "menu",
  setMenuState: (state: MenuState) => set({ menuState: state }),
  nodeState: null,
  setNodeState: (state: NodeState) => set({ nodeState: state }),
}));
