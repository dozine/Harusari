"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full h-32 px-10 bg-white ">
      <Link href="/dashboard" className="text-black text-xl">
        My Dashboard
      </Link>
      <div className="b">
        <div>배경색 조절</div>
      </div>
    </nav>
  );
}
