import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Props = {
  icon: React.ReactNode;
  title: String;
  description: String;
  connected: Boolean;
};

const ConnectionCard = ({ description, icon, title, connected }: Props) => {
  return (
    <Card className="flex w-full items-end bg-black text-white justify-between">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">{icon}</div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <div className="flex flex-col gap-2 p-4">
        {connected ? (
          <button
            disabled
            className=" rounded-lg bg-neutral-900 p-2 font-bold text-primary-foreground"
          >
            Connected
          </button>
        ) : (
          <Link
            href="#"
            className=" rounded-lg bg-neutral-900 p-2 font-bold text-primary-foreground"
          >
            Connect
          </Link>
        )}
      </div>
    </Card>
  );
};

export default ConnectionCard;
