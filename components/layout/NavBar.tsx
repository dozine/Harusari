"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineWbSunny } from "react-icons/md";

export default function Navbar() {
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
    <nav className="flex justify-between items-center w-full h-32 px-10 bg-white ">
      <div>
        <Link href="/dashboard" className="text-black text-3xl font-bold ">
          {pageTitle}
        </Link>
        <div className="text-xl font-medium text-gray-700">{formattedDate}</div>
      </div>
      <button className="text-2xl text-orange-400 hover:text-yellow-300 transition-colors">
        <MdOutlineWbSunny />
      </button>
    </nav>
  );
}
