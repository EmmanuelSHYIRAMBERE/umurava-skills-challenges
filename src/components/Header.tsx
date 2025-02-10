"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/Official.png"
                alt="Umurava Logo"
                className="w-32 h-20 object-contain"
                width={128}
                height={80}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/challenge" className="nav-link">
              Challenge & Hackthons
            </Link>
            <Link href="/learning" className="nav-link">
              For Learning institutions
            </Link>
            <Link href="/about-us" className="nav-link">
              About Us
            </Link>
            <Link href="/contact-us" className="nav-link">
              Contact Us
            </Link>
          </nav>

          {/* Join Button */}
          <div>
            {session?.user ? (
              <Link
                href={session?.user.role === "admin" ? "/admin" : "/dashboard"}
                className="bg-[#020B2D] text-white px-6 py-2 rounded-md hover:bg-blue-900 transition-colors duration-200"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-[#020B2D] text-white px-6 py-2 rounded-md hover:bg-blue-900 transition-colors duration-200"
              >
                Join the Program
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
