import "./sidebar.scss";

import { CircleX } from "lucide-react";
import { useState } from "react";

type SidebarProps = {
  leftSlot: React.ReactNode;
  leftWidth: string;
  leftIcon: React.ReactNode;
  rightSlot: React.ReactNode;
  rightWidth: string;
  rightIcon?: React.ReactNode;
};

const Sidebar = ({
  leftSlot,
  leftWidth,
  leftIcon,
  rightSlot,
  rightWidth,
  rightIcon = <CircleX className="h-6 w-6 cursor-pointer" />,
}: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full flex sidebar-wrapper gap-2">
      <div
        className={`flex border transition-width duration-500 ${
          isSidebarOpen ? leftWidth : rightWidth
        } shadow-lg bg-white rounded-md`}
      >
        <div
          className={`flex flex-col pt-1 bg-gray-800 transition-width duration-700 ${
            isSidebarOpen ? "rounded-border" : "rounded-border-collapsed"
          } `}
        >
          <button className="text-white p-2" onClick={toggleSidebar}>
            {isSidebarOpen ? rightIcon : leftIcon}
          </button>
        </div>
        <div className="flex flex-col overflow-x-hidden">
          {isSidebarOpen && <div className="w-full flex gap-4">{leftSlot}</div>}
        </div>
      </div>
      <div className="flex-1 bg-gray-100">
        <div className="w-full flex gap-4">{rightSlot}</div>
      </div>
    </div>
  );
};

export default Sidebar;
