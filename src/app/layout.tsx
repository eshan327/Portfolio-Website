import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eshan Khan - Portfolio",
  description: "Personal portfolio showcasing my projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Eshan</span>
                </Link>
              </div>
              <div className="flex space-x-8">
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
                <Link href="/projects" className="hover:text-blue-600 dark:hover:text-blue-400">Projects</Link>
                <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-16 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
