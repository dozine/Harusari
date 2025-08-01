"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Sidebar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <aside className="p-4 flex flex-col h-full bg-black rounded-full">
      <div className="mt-2 mb-2 p-2 bg-amber-700 rounded-full">
        {user && <p>{user.name}</p>}
      </div>
      <nav className="flex-1 space-y-2 overflow-y-auto">
        <Link href="/" className="block p-2 rounded">
          첫번째
        </Link>
        <Link href="/" className="block p-2 rounded">
          두번째
        </Link>
        <Link href="/" className="block p-2 rounded">
          세번째
        </Link>
      </nav>
      <button onClick={handleLogout}>logout</button>
    </aside>
  );
}
