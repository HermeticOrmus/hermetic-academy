"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, BookOpen, Compass, Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface Article {
  title: string;
  slug: string;
}

interface SidebarSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  articles: Article[];
  defaultOpen?: boolean;
}

const SIDEBAR_STRUCTURE: SidebarSection[] = [
  {
    title: "Getting Started",
    icon: Compass,
    defaultOpen: true,
    articles: [
      { title: "What is Hermetics?", slug: "/wiki/getting-started/what-is-hermetics" },
      { title: "The Seven Principles", slug: "/wiki/getting-started/the-seven-principles" },
      { title: "How to Use This Wiki", slug: "/wiki/getting-started/how-to-use-this-wiki" },
      { title: "Glossary", slug: "/wiki/getting-started/glossary" },
    ]
  },
  {
    title: "The 7 Principles",
    icon: BookOpen,
    defaultOpen: true,
    articles: [
      { title: "1. Mentalism", slug: "/wiki/principles/mentalism/overview" },
      { title: "2. Correspondence", slug: "/wiki/principles/correspondence/overview" },
      { title: "3. Vibration", slug: "/wiki/principles/vibration/overview" },
      { title: "4. Polarity", slug: "/wiki/principles/polarity/overview" },
      { title: "5. Rhythm", slug: "/wiki/principles/rhythm/overview" },
      { title: "6. Cause & Effect", slug: "/wiki/principles/cause-effect/overview" },
      { title: "7. Gender", slug: "/wiki/principles/gender/overview" },
    ]
  },
  {
    title: "Applications",
    icon: Lightbulb,
    defaultOpen: false,
    articles: [
      { title: "Climbing Ranked (Gaming)", slug: "/wiki/applications/gaming/ranked-climbing" },
      { title: "Dealing with Tilt (Gaming)", slug: "/wiki/applications/gaming/dealing-with-tilt" },
    ]
  }
];

function SidebarSection({ section, isOpen, toggleOpen }: {
  section: SidebarSection;
  isOpen: boolean;
  toggleOpen: () => void;
}) {
  const pathname = usePathname();
  const Icon = section.icon;

  return (
    <div className="mb-6">
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          <span>{section.title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {isOpen && (
        <nav className="mt-1 ml-2 space-y-1">
          {section.articles.map((article) => {
            const isActive = pathname === article.slug;
            return (
              <Link
                key={article.slug}
                href={article.slug}
                className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gold-divine/10 text-gold-divine font-medium border-l-2 border-gold-divine'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
                }`}
              >
                {article.title}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export function WikiSidebar() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    SIDEBAR_STRUCTURE.reduce((acc, section) => ({
      ...acc,
      [section.title]: section.defaultOpen ?? false
    }), {})
  );

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-gray-800 bg-gray-900/50 overflow-y-auto">
      <div className="p-6">
        {/* Wiki Header */}
        <Link href="/wiki" className="block mb-8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-gold-divine to-gold-radiant bg-clip-text text-transparent">
            Hermetic Wiki
          </h2>
          <p className="text-xs text-gray-500 mt-1">Complete Knowledge Base</p>
        </Link>

        {/* Navigation Sections */}
        <div>
          {SIDEBAR_STRUCTURE.map((section) => (
            <SidebarSection
              key={section.title}
              section={section}
              isOpen={openSections[section.title]}
              toggleOpen={() => toggleSection(section.title)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
