"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/layout/NavBar";
import Sidebar from "@/components/layout/SideBar";

export default function DashboardPage() {
  return (
    <ProtectedRoute redirectTo="/login">
      <div className="flex bg-white h-screen">
        <div className="h-full p-4">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col w-full">
          <Navbar />
          <main className="flex-1 p-6 overflow-auto bg-yellow-300">
            <div>
              <div>위젯1 </div>
              <div>위젯2 </div>
            </div>
          </main>
          <footer className="bg-pink-300">
            오늘 어때. All rights reserved
          </footer>
        </div>
      </div>
    </ProtectedRoute>
  );
}
