"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const handleLogout = () => {
    logout();
  };
  return (
    <aside className="p-4 flex flex-col h-full bg-gray-900 rounded-full justify-between items-center gap-6">
      <div className="flex mt-2 mb-2 p-2 bg-orange-500 rounded-full aspect-square items-center justify-center">
        {user && <p>{user.name[0]}</p>}
      </div>
      <nav className="space-y-10 overflow-y-auto">
        <Link
          href="/dashboard"
          className="block p-2 rounded text-white text-center "
        >
          <div className="w-3 h-3 rounded-full bg-white" />
        </Link>
        <Link
          href="/todos"
          className="block p-2 rounded text-white text-center"
        >
          <div className="w-3 h-3 bg-white" />
        </Link>
        <Link
          href="/dailylog
        "
          className="block p-2 rounded text-white text-center"
        >
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent "></div>
        </Link>
      </nav>
      <button className="text-white mb-2 mt-2" onClick={handleLogout}>
        <FaSignOutAlt />
      </button>
    </aside>
  );
}
