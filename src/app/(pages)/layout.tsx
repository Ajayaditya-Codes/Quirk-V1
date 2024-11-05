import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconExchange,
  IconTerminal2,
  IconLayoutDashboard,
} from "@tabler/icons-react";
import DashboardNavbar from "@/components/global/dashboard-navbar";
import { SignOutButton } from "@/components/global/signout";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  const links = [
    {
      title: "Dashboard",
      icon: <IconLayoutDashboard className="h-full w-full text-white" />,
      href: "/dashboard",
    },

    {
      title: "Connections",
      icon: <IconExchange className="h-full w-full text-white" />,
      href: "/connections",
    },
    {
      title: "Logs",
      icon: <IconTerminal2 className="h-full w-full text-white" />,
      href: "/logs",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-white" />,
      href: "https://github.com",
    },
    {
      title: "Logout",
      icon: <SignOutButton />,
      href: "#",
    },
  ];
  return (
    <div className="h-screen overflow-scroll w-full bg-black bg-dot-white/[0.2]  relative flex-col flex p-7 text-white items-center ">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_85%,black)]"></div>
      <DashboardNavbar />
      <FloatingDock desktopClassName="fixed bottom-0 mb-5 " items={links} />
      <div className="w-full mt-7">{props.children}</div>
    </div>
  );
};

export default Layout;
