import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = async (props: Props) => {
  return (
    <header className="fixed right-0 left-0 top-0 p-7 bg-black  z-[100] flex items-center justify-between">
      <aside className="flex items-center gap-[2px] text-white">
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
      <aside className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-2 text-lg font-medium text-white backdrop-blur-3xl">
            Get Started
          </span>
        </Link>
      </aside>
    </header>
  );
};

export default Navbar;
