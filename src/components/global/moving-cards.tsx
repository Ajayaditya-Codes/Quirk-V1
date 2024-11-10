"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function MovingCards() {
  return (
    <div className=" rounded-md h-fit flex flex-col antialiased bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={madeby} direction="right" speed="normal" />
    </div>
  );
}

const madeby = [
  {
    title: "Next.Js",
    src: "/nextjs-icon-svgrepo-com.svg",
    name: "Next.Js",
    width: 60,
  },
  {
    title: "Clerk Auth",
    src: "/clerk-icon-new.svg",
    name: "Clerk Auth",
    width: 60,
  },
  {
    title: "Drizzle ORM",
    src: "/logo-github-sq-light.svg",
    name: "Drizzle ORM",
    width: 170,
  },
  {
    title: "Neon Tech",
    src: "/color.png",
    name: "",
    width: 170,
  },
  {
    title: "Ngrok",
    src: "/ngrok-white.svg",
    name: "",
    width: 170,
  },
  {
    title: "Tailwind CSS",
    src: "/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg",
    name: "Tailwind CSS",
    width: 60,
  },
  {
    title: "Shadcn/UI",
    src: "/shadcn-ui-seeklogo.svg",
    name: "Shadcn/UI",
    width: 60,
  },
  {
    title: "Aceternity UI",
    src: "/aceternity.svg",
    name: "Aceternity UI",
    width: 60,
  },
  {
    title: "React Flow",
    src: "/react-flow-icon-filled-256.svg",
    name: "React Flow",
    width: 60,
  },
];
