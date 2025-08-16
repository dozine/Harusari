import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/layout/NavBar";
import Sidebar from "@/components/layout/SideBar";
import { useState } from "react";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <ProtectedRoute redirectTo="/login">
      <div className="flex bg-orange-500 min-h-dvh justify-center">
        <div className="flex bg-white min-h-dvh w-full max-w-[1280px] mx-auto">
          <div className="hidden md:block h-full p-4">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col w-full">
            <Navbar />
            <main className="flex-1 p-6 overflow-auto">{children} </main>
            <footer className="flex justify-center mb-6 text-gray-900">
              Harusari. All rights reserved.
            </footer>
          </div>
        </div>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="fixed left-0 top-0 w-64 h-full bg-white p-4 shadow-md">
              <Sidebar />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
