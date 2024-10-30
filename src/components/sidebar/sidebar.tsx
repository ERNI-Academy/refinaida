import "./sidebar.scss";

import { CircleX } from "lucide-react";
import { useState } from "react";

type SidebarProps = {
  height: string;
  leftSlot: React.ReactNode;
  leftWidth: string;
  leftIcon: React.ReactNode;
  rightSlot: React.ReactNode;
  rightWidth: string;
  rightIcon?: React.ReactNode;
};

const Sidebar = ({
  height,
  leftSlot,
  leftWidth,
  leftIcon,
  rightSlot,
  rightWidth,
  rightIcon = <CircleX className="h-6 w-6 cursor-pointer" />,
}: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () =>
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);

  return (
    <div className="w-full flex gap-2" style={{ height }}>
      <div
        className={`flex right-slot-wrapper transition-all duration-500 border shadow-lg bg-white rounded-md ${
          isSidebarOpen ? leftWidth : rightWidth
        }`}
      >
        <div
          className={`flex flex-col pt-1 bg-gray-800 transition-all duration-700 ${
            isSidebarOpen ? "rounded-border" : "rounded-border-collapsed"
          } `}
        >
          <button className="text-white p-2" onClick={toggleSidebar}>
            {isSidebarOpen ? rightIcon : leftIcon}
          </button>
        </div>
        <div className="flex flex-col w-full h-full overflow-hidden">
          {isSidebarOpen && (
            <div className="flex w-full h-full gap-4">{leftSlot}</div>
          )}
        </div>
      </div>
      <div className="flex-1 w-full h-full">
        <div className="flex w-full h-full gap-4">{rightSlot}</div>
      </div>
    </div>
  );
};

export default Sidebar;
