import { UserButton } from "@clerk/nextjs";
import React from "react";
import SidebarNavigation from "./nav";

const Sidebar = () => {
  return (
    <div className="bg-white flex flex-col justify-between shadow-md">
      <div className="flex justify-center items-center w-full aspect-square">
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="w-full flex-1">
        <SidebarNavigation />
      </div>
      <div className=""></div>
    </div>
  );
};

export default Sidebar;
