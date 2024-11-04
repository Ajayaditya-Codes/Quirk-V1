import Image from "next/image";
import React from "react";
import { UserButton } from "@clerk/nextjs";

type Props = {};

const DashboardNavbar = async (props: Props) => {
  return (
    <header className="fixed top-0 right-0 p-5 left-0 w-full mb-5 bg-black  z-[100] flex items-center justify-between">
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
      <aside className="hidden md:flex items-center flex-row gap-4">
        <p className="text-lg font-bold text-neutral-300">20 Credits Left</p>
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
