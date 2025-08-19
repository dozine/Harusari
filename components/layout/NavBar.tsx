"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { MdOutlineWbSunny } from "react-icons/md";
import Sidebar from "./SideBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const pathname = usePathname();
  const getPageTitle = (path: string) => {
    switch (path) {
      case "/dashboard":
        return "Dashboard";
      case "/todos":
        return "TodoList";
      case "/dailylog":
        return "DailyLog";
      default:
        return "Harusari";
    }
  };

  const pageTitle = getPageTitle(pathname);
  return (
    <>
      <nav className="flex justify-between items-center w-full h-25 px-10 py-4 bg-white">
        <div className="flex">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-2xl text-gray-800 mr-4"
          >
            <HiMenu />
          </button>
          <div>
            <div className="text-black text-2xl font-bold ">{pageTitle}</div>
            <div className="text-lg font-medium text-gray-700">
              {formattedDate}
            </div>
          </div>
        </div>
        <button className="text-lg text-orange-400 hover:text-yellow-300 transition-colors">
          <MdOutlineWbSunny />
        </button>
      </nav>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setIsOpen(!isOpen)}
          />
          <div className="relative w-2xl h-full bg-gray-900 p-4 animate-slide-in">
            <Sidebar />
          </div>
        </div>
      )}
    </>
  );
}
