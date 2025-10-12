import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Eshan | Portfolio',
  description: 'Personal portfolio of Eshan, a CS/Math student passionate about building impactful technology.',
  keywords: ['portfolio', 'developer', 'software engineer', 'CS student', 'mathematics'],
  themeColor: '#111827',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} font-sans bg-gray-900 text-gray-100 min-h-screen`}>
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <BackToTop />
      </body>
    </html>
  );
}
