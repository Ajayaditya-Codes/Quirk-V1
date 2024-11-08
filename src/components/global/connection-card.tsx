"use client";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  connected: boolean;
  allowDisconnect: boolean;
  connectionLink?: string;
  disconnectUrl: string;
};

const ConnectionCard = ({
  description,
  icon,
  title,
  connected,
  allowDisconnect,
  connectionLink,
  disconnectUrl,
}: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleDisconnect = async (title: string) => {
    let err = false;
    try {
      const response: Response = await fetch(disconnectUrl, {
        method: "POST",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to disconnect");
      }

      const data = await response.json();
    } catch (error) {
      err = true;
    } finally {
      router.refresh();
      if (err) {
        toast({
          variant: "destructive",
          title: `There was some error disconnecting ${title}. Try Again Later.`,
        });
      } else {
        toast({
          title: `${title} Disconnected Successfully`,
        });
      }
    }
  };
  return (
    <Card className="flex w-full items-end bg-black text-white justify-between border border-white">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">{icon}</div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <div className="flex flex-row gap-2 space-x-3 p-4 text-white">
        <button
          disabled={!allowDisconnect || !connected}
          onClick={() => handleDisconnect(title)}
          className={
            !allowDisconnect || !connected
              ? "rounded-lg bg-neutral-900 p-2 text-gray-400 border  border-neutral-700 font-bold "
              : "rounded-lg bg-neutral-900 p-2 border border-red-800 font-bold "
          }
        >
          Disconnect
        </button>
        {connected ? (
          <button
            disabled
            className=" rounded-lg bg-neutral-900 text-gray-400  border border-neutral-700 p-2 font-bold  w-26 text-center"
          >
            Connected
          </button>
        ) : (
          <Link
            href={connectionLink ? connectionLink : "#"}
            className=" rounded-lg bg-neutral-900 p-2 font-bold border border-white  w-26 text-center"
          >
            Connect
          </Link>
        )}
      </div>
    </Card>
  );
};

export default ConnectionCard;
