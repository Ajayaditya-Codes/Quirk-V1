import Image from "next/image";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { IconBook2, IconHeadphones } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type Props = {
  credits?: number | null;
};

const DashboardNavbar = async ({ credits }: Props) => {
  return (
    <header className="fixed top-0 right-0 p-5 left-0 w-full mb-5 bg-black h-24 z-40 flex items-center justify-between">
      <Link href="/">
        <aside className="flex items-center gap-[2px]">
          <p className="text-4xl font-bold -mr-1">Qu</p>
          <Image
            src="/flash.png"
            width={30}
            height={30}
            alt="fuzzie logo"
            className="shadow-sm"
          />
          <p className="text-4xl font-bold -ml-1">rk</p>
        </aside>
      </Link>

      <aside className="hidden md:flex items-center flex-row gap-4">
        <p className="text-lg font-bold text-neutral-300">
          {credits === null ? "Loading..." : `Credits: ${credits}/20`}
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="rounded-lg w-11 h-11 items-center justify-center flex border-0 bg-neutral-900">
                <IconHeadphones />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="z-50 flex">Comming Soon!</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="rounded-lg w-11 h-11 items-center justify-center flex border-0 bg-neutral-900">
                <IconBook2 />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="z-50 flex">Comming Soon!</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="rounded-lg p-2 flex border-0 bg-neutral-900">
          <UserButton showName={true} />
        </div>
      </aside>
      <aside className="flex md:hidden items-center flex-row gap-4">
        <div className="rounded-lg p-2 flex border-0 bg-neutral-900">
          <UserButton />
        </div>
      </aside>
    </header>
  );
};

export default DashboardNavbar;
