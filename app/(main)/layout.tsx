import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/layout/NavBar";
import Sidebar from "@/components/layout/SideBar";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoute redirectTo="/login">
      <div className="flex bg-orange-500 h-screen justify-center md:overflow-hidden">
        <div className="flex bg-white h-full w-full  max-w-5xl overflow-hidden">
          <div className="hidden sm:block p-4 flex-shrink-0">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col h-full">
            <div className="flex-shrink-0">
              <Navbar />
            </div>
            <main className="flex-1 p-6 overflow-auto md:overflow-hidden">
              {children}
            </main>
            <footer className="flex-shrink-0 flex justify-center py-2 text-gray-900 text-xs">
              Harusari. All rights reserved.
            </footer>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
