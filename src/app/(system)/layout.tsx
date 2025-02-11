"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div
        className={`
        fixed z-40 top-0 left-0 h-screen
        md:relative md:block
        ${isSidebarOpen ? "block" : "hidden"}
        w-64 bg-gray-700
        transition-transform duration-300 ease-in-out
      `}
      >
        <button
          className="md:hidden absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          <X className="text-white" />
        </button>
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-30 ">
          <div className="flex items-center ">
            <button className="md:hidden p-2" onClick={toggleSidebar}>
              <Menu />
            </button>
            <Navbar />
          </div>
        </div>

        <main className="flex-grow">{children}</main>
      </div>
    </div>
  );
}
