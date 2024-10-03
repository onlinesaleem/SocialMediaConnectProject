// src/app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    console.log("Navbar - status:", status);
    console.log("Navbar - session:", session);
  }, [status, session]);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  // Define routes where Navbar should not be displayed
  const excludedRoutes = ["/login", "/signup", "/"];

  // If current path is in excludedRoutes, don't render the Navbar
  if (excludedRoutes.includes(pathname)) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      {/* Navbar content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="text-xl font-bold text-blue-600 cursor-pointer">MySaaS</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="flex items-center">
            {status === "authenticated" ? (
              <>
                <Link
                  href="/dashboard"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : status === "loading" ? (
              // Optionally, display nothing or a loading indicator
              null)
            
            : (
              <>
                <Link
                  href="/login"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          {status === "authenticated" ? (
            <>
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
