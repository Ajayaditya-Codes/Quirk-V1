"use client";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  IconBrandAsana,
  IconBrandGithub,
  IconBrandSlack,
  IconBrandTrello,
  IconEditCircle,
} from "@tabler/icons-react";

type Props = {
  name: string;
};

export default function WorkflowCard({ name }: Props) {
  return (
    <Link href={`/editor/${name}`}>
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
        <button className="bg-neutral-900 p-2 m-5 rounded-lg flex flex-row items-center gap-2 ">
          <IconEditCircle />
          Edit Workflow
        </button>
      </Card>
    </Link>
  );
}
