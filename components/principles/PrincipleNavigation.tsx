"use client";

import Link from "next/link";
import { Principle } from "@/lib/constants";

/**
 * Principle Navigation
 *
 * WHY: Help users flow through all 7 principles naturally
 * Circular navigation (7 wraps to 1) - everything is a cycle (RHYTHM)
 *
 * Principle: RHYTHM - Natural flow through principles
 * Principle: CORRESPONDENCE - Navigation mirrors circular nature of learning
 */

interface PrincipleNavigationProps {
  currentPrinciple: Principle;
  nextPrinciple: Principle;
  prevPrinciple: Principle;
}

export function PrincipleNavigation({
  currentPrinciple,
  nextPrinciple,
  prevPrinciple,
}: PrincipleNavigationProps) {
  return (
    <section className="py-12 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previous Principle */}
          <Link
            href={`/principles/${prevPrinciple.slug}`}
            className="group p-6 rounded-xl border border-gray-800 hover:border-gray-700 bg-gray-900/50 hover:bg-gray-900 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  Previous
                </p>
                <p
                  className="text-lg font-semibold mt-1"
                  style={{ color: prevPrinciple.color.primary }}
                >
                  {prevPrinciple.title}
                </p>
                <p className="text-sm text-gray-400">{prevPrinciple.subtitle}</p>
              </div>
            </div>
          </Link>

          {/* Next Principle */}
          <Link
            href={`/principles/${nextPrinciple.slug}`}
            className="group p-6 rounded-xl border border-gray-800 hover:border-gray-700 bg-gray-900/50 hover:bg-gray-900 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="flex-1 text-right">
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  Next
                </p>
                <p
                  className="text-lg font-semibold mt-1"
                  style={{ color: nextPrinciple.color.primary }}
                >
                  {nextPrinciple.title}
                </p>
                <p className="text-sm text-gray-400">{nextPrinciple.subtitle}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Return Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Return to All Principles</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
