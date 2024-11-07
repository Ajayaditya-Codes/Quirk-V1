"use client";
import { useMenuStore } from "../_constants/menuStateStore";
import Actions from "./menus/actions";

export default function Menu() {
  const { menuState, setMenuState } = useMenuStore();
  switch (menuState) {
    case "menu":
      return <Actions />;
    case "github":
      return <button onClick={() => setMenuState("menu")}>Back</button>;
    case "asana":
      return <button onClick={() => setMenuState("menu")}>Back</button>;
    case "slack":
      return <button onClick={() => setMenuState("menu")}>Back</button>;
    case "condition":
      return <button onClick={() => setMenuState("menu")}>Back</button>;
    default:
      return <Actions />;
  }
}
