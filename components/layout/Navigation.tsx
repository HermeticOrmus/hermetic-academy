"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/principles", label: "Principles" },
    { href: "/community", label: "Community" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <nav className="border-b border-gray-800 bg-cosmic-black/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cosmic-purple to-cosmic-gold rounded-full" />
            <span className="font-bold text-xl bg-gradient-to-r from-cosmic-purple to-cosmic-gold bg-clip-text text-transparent">
              Hermetic Youth
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-cosmic-gold",
                  pathname === link.href
                    ? "text-cosmic-gold"
                    : "text-gray-400"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button (placeholder) */}
          <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-cosmic-gold">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
