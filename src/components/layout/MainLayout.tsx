import { Link, Outlet } from "react-router";
import UserDropdown from "@/components/common/UserDropdown";

export default function MainLayout() {
  const showHeader = import.meta.env.VITE_SHOW_HEADER === "1";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      {showHeader && (
        <header className="h-12 md:h-16 bg-white shadow-sm px-6 flex justify-center items-center justify-between sticky top-0 z-40">
          <div className="w-280 flex justify-between">
            <div className="flex items-center gap-4">
              {/* <h1 className="text-xl font-bold text-blue-600">員購系統</h1> */}
              <nav className="hidden md:flex gap-8 ml-8">
                <Link
                  to="/staffbuy/purchase"
                  className="text-gray-600 hover:text-blue-500"
                >
                  員購區
                </Link>
                <Link
                  to="/groupbuy/purchase"
                  className="text-gray-600 hover:text-blue-500"
                >
                  團購區
                </Link>
              </nav>
            </div>

            <div className="relative">
              <UserDropdown />
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 p-3.5 bg-[#FBFBFB]">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
