'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-lg font-bold text-white">Eshan</span>
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">Home</Link>
            <Link href="/projects" className="text-gray-300 hover:text-white transition-colors text-sm">Projects</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 