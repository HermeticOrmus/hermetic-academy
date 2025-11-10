"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserMenu } from "@/components/auth/UserMenu";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
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
