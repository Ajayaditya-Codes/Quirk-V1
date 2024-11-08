import Editor from "../_components/editor";
import Menu from "../_components/menu";

export default async function Page() {
  return (
    <div className="w-full h-[85vh] py-auto flex flex-row space-x-5">
      <Editor />
      <Menu />
    </div>
  );
}
