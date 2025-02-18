'use client'; // Mark as a Client Component

import Link from 'next/link';
import { getToken } from '../utils/auth';

export default function Navbar() {
  const isAuthenticated = !!getToken();

  return (
    <nav className="sticky top-0 z-50 p-4 bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity">
          Task Manager
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          {isAuthenticated ? (
            <>
              {/* Tasks Link */}
              <Link
                href="/tasks"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                Tasks
              </Link>
            </>
          ) : (
            <>
              {/* Login Link */}
              <Link
                href="/login"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                Login
              </Link>

              {/* Register Link */}
              <Link
                href="/register"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}