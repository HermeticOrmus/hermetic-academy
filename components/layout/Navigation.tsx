"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserMenu } from "@/components/auth/UserMenu";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/wiki", label: "Wiki" },
    { href: "/heart-preview", label: "How It Works" },
    { href: "/shop", label: "Cosmetics" },
    { href: "/support", label: "Support" },
  ];

  return (
    <nav className="border-b border-gray-800 bg-cosmic-black/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/logo/hermetic-academy-logo.svg"
              alt="Hermetic Academy Logo"
              className="w-10 h-10"
            />
            <span className="font-bold text-xl" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="bg-gradient-to-r from-gold-divine to-gold-radiant bg-clip-text text-transparent">
                Hermetic Academy
              </span>
            </span>
          </Link>

          {/* Navigation Links + User Menu */}
          <div className="flex items-center space-x-8">
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

            {/* User Menu (Sign In or Profile) */}
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
