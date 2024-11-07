"use client";
import { useMenuStore } from "../_constants/menuStateStore";
import Actions from "./menus/actions";
import AsanaMenu from "./menus/asanaMenu";
import ConditionMenu from "./menus/conditionMenu";
import GithubMenu from "./menus/githubMenu";
import SlackMenu from "./menus/slackMenu";

export default function Menu() {
  const { menuState, setMenuState } = useMenuStore();
  switch (menuState) {
    case "menu":
      return <Actions />;
    case "github":
      return <GithubMenu />;
    case "asana":
      return <AsanaMenu />;
    case "slack":
      return <SlackMenu />;
    case "condition":
      return <ConditionMenu />;
    default:
      return <Actions />;
  }
}
