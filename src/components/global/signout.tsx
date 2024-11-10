"use client";

import { useClerk } from "@clerk/nextjs";
import { IconLogout } from "@tabler/icons-react";
import React from "react";

export const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <button onClick={() => signOut({ redirectUrl: "/" })}>
      <IconLogout className="h-full w-full text-white" />
    </button>
  );
};
