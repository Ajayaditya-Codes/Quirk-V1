import { Switch } from "@/components/ui/switch";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import {
  IconBrandAsana,
  IconBrandGithub,
  IconBrandSlack,
  IconBrandTrello,
} from "@tabler/icons-react";

type Props = {
  name: string;
};

export default function WorkflowCard({ name }: Props) {
  return (
    <Card className="flex w-full items-end justify-between bg-black text-white">
      <CardHeader className="flex flex-col gap-4 ">
        <div className="flex flex-row gap-2">
          <IconBrandGithub />
          <IconBrandSlack />
          <IconBrandAsana />
          <IconBrandTrello />
        </div>
        <div className="">
          <CardTitle className="text-lg mt-5">{name} Workflow</CardTitle>
          <CardDescription>Automate Your Github Workflow</CardDescription>
        </div>
      </CardHeader>
      <div className="flex flex-row items-center gap-2 p-4 ">
        <Link href={`/editor/${name}`}>
          {" "}
          <button className="bg-neutral-900 p-2 rounded-lg">
            Edit Workflow
          </button>
        </Link>
      </div>
    </Card>
  );
}
