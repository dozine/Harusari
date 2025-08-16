import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/layout/NavBar";
import Sidebar from "@/components/layout/SideBar";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoute redirectTo="/login">
      <div className="flex bg-orange-500 min-h-[100dvh] justify-center">
        <div className="flex bg-white min-h-screen w-full max-w-[1280px] mx-auto">
          <div className="min-h-screen p-4">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col w-full min-h-screen">
            <Navbar />
            <main className="flex-1 p-6 overflow-auto">{children} </main>
            <footer className="flex justify-center mb-6 text-gray-900">
              Harusari. All rights reserved.
            </footer>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
