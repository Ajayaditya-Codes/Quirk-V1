import Editor from "../_components/editor";
import Menu from "../_components/menu";

export default function Page() {
  return (
    <div className="w-full h-full py-5 flex flex-row space-x-5">
      <Editor />
      <Menu />
    </div>
  );
}
