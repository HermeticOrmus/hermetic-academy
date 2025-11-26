/**
 * Tone Switcher Component
 *
 * WHY: Allows users to switch between content styles
 * Designed to look like a language selector dropdown, similar to site language toggles
 *
 * VARIANTS:
 * - dropdown: Full dropdown with categories (for navigation)
 * - pills: Compact pill buttons (for inline use - shows subset)
 * - compact: Icon-only dropdown (for mobile)
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { useTone, TONES, ToneType, getTonesByCategory, TONE_IDS } from "@/contexts/ToneContext";

interface ToneSwitcherProps {
  variant?: "dropdown" | "pills" | "compact";
  showLabel?: boolean;
  /** For pills variant: which tones to show (defaults to all) */
  visibleTones?: ToneType[];
}

const CATEGORY_LABELS = {
  base: "Classic",
  lifestyle: "Lifestyle",
  professional: "Professional",
  creative: "Creative",
};

export function ToneSwitcher({
  variant = "dropdown",
  showLabel = true,
  visibleTones,
}: ToneSwitcherProps) {
  const { tone, setTone, toneInfo } = useTone();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Pills variant - compact horizontal buttons
  if (variant === "pills") {
    const tonesToShow = visibleTones
      ? visibleTones.map((id) => TONES[id])
      : Object.values(TONES).slice(0, 5); // Show first 5 by default

    return (
      <div className="flex items-center gap-1 p-1 bg-gray-900/50 rounded-lg border border-gray-800 overflow-x-auto">
        {tonesToShow.map((t) => (
          <button
            key={t.id}
            onClick={() => setTone(t.id)}
            className={`
              px-2 py-1.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap
              ${tone === t.id
                ? "bg-cosmic-purple text-white shadow-sm"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              }
            `}
            title={t.description}
          >
            <span className={showLabel ? "mr-1.5" : ""}>{t.emoji}</span>
            {showLabel && t.label}
          </button>
        ))}
        {/* Show more indicator if there are hidden tones */}
        {!visibleTones && Object.values(TONES).length > 5 && (
          <span className="px-2 text-xs text-gray-500">+{Object.values(TONES).length - 5}</span>
        )}
      </div>
    );
  }

  // Compact variant - icon only button with dropdown
  if (variant === "compact") {
    return (
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center justify-center w-10 h-10 rounded-lg
            bg-gray-900/50 border border-gray-700 hover:border-gray-600
            text-lg transition-all duration-200
            ${isOpen ? "border-cosmic-purple" : ""}
          `}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={`Content style: ${toneInfo.label}`}
        >
          {toneInfo.emoji}
        </button>

        {isOpen && (
          <ToneDropdownMenu
            currentTone={tone}
            onSelect={(t) => {
              setTone(t);
              setIsOpen(false);
            }}
          />
        )}
      </div>
    );
  }

  // Dropdown variant (default) - full dropdown with categories
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg
          bg-gray-900/50 border border-gray-700 hover:border-gray-600
          text-sm font-medium text-gray-300 hover:text-gray-100
          transition-all duration-200
          ${isOpen ? "border-cosmic-purple" : ""}
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base">{toneInfo.emoji}</span>
        {showLabel && (
          <>
            <span>{toneInfo.label}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>

      {isOpen && (
        <ToneDropdownMenu
          currentTone={tone}
          onSelect={(t) => {
            setTone(t);
            setIsOpen(false);
          }}
          showCategories
        />
      )}
    </div>
  );
}

/**
 * Dropdown menu component - reused by different variants
 */
function ToneDropdownMenu({
  currentTone,
  onSelect,
  showCategories = false,
}: {
  currentTone: ToneType;
  onSelect: (tone: ToneType) => void;
  showCategories?: boolean;
}) {
  const categories = getTonesByCategory();

  return (
    <div
      className="
        absolute right-0 mt-2 w-56 py-1
        bg-gray-900 border border-gray-700 rounded-lg shadow-xl
        z-50 overflow-hidden max-h-96 overflow-y-auto
      "
      role="listbox"
    >
      <div className="px-3 py-2 border-b border-gray-800">
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          Content Style
        </span>
      </div>

      {showCategories ? (
        // Render with category headers
        Object.entries(categories).map(([category, tones]) => (
          <div key={category}>
            {tones.length > 0 && (
              <>
                <div className="px-3 py-1.5 mt-1">
                  <span className="text-[10px] text-gray-600 uppercase tracking-wider font-medium">
                    {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
                  </span>
                </div>
                {tones.map((t) => (
                  <ToneOption
                    key={t.id}
                    tone={t}
                    isSelected={currentTone === t.id}
                    onSelect={() => onSelect(t.id)}
                  />
                ))}
              </>
            )}
          </div>
        ))
      ) : (
        // Flat list
        Object.values(TONES).map((t) => (
          <ToneOption
            key={t.id}
            tone={t}
            isSelected={currentTone === t.id}
            onSelect={() => onSelect(t.id)}
          />
        ))
      )}
    </div>
  );
}

/**
 * Individual tone option button
 */
function ToneOption({
  tone,
  isSelected,
  onSelect,
}: {
  tone: { id: ToneType; emoji: string; label: string; description: string };
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full flex items-center gap-3 px-3 py-2 text-left
        transition-colors duration-150
        ${isSelected
          ? "bg-cosmic-purple/20 text-cosmic-purple"
          : "text-gray-300 hover:bg-gray-800 hover:text-gray-100"
        }
      `}
      role="option"
      aria-selected={isSelected}
    >
      <span className="text-lg">{tone.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="font-medium">{tone.label}</div>
        <div className="text-xs text-gray-500 truncate">{tone.description}</div>
      </div>
      {isSelected && (
        <svg className="w-4 h-4 text-cosmic-purple flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}

/**
 * Compact inline tone switcher for use within content
 * Cycles through tones on click
 */
export function ToneSwitcherInline() {
  const { tone, setTone } = useTone();

  const currentIndex = TONE_IDS.indexOf(tone);
  const nextTone = TONE_IDS[(currentIndex + 1) % TONE_IDS.length];

  return (
    <button
      onClick={() => setTone(nextTone)}
      className="
        inline-flex items-center gap-1.5 px-2 py-1
        text-xs font-medium text-gray-400
        bg-gray-800 hover:bg-gray-700
        rounded-full transition-colors
      "
      title={`Currently: ${TONES[tone].label}. Click for ${TONES[nextTone].label}`}
    >
      <span>{TONES[tone].emoji}</span>
      <span className="sr-only">Switch content style</span>
    </button>
  );
}
