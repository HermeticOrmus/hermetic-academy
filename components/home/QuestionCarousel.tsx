"use client";

import { useState, useEffect } from "react";
import { useTone } from "@/contexts/ToneContext";
import { getContent } from "@/lib/tone-content";

export function QuestionCarousel() {
  const { tone } = useTone();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get questions from tone content (stored as array in the content)
  const questionsRaw = getContent("questions", tone);
  const questions = Array.isArray(questionsRaw) ? questionsRaw : [
    "is everyone so anxious?",
    "do dating apps feel hollow?",
    "is housing unaffordable?",
    "does social media drain you?",
    "are people so polarized?",
  ];
  const prefix = getContent("questionPrefix", tone);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % questions.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [questions.length]);

  return (
    <div className="relative h-24 flex items-center justify-center">
      <div
        className={`text-2xl md:text-4xl font-bold text-gray-200 transition-all duration-300 ${
          isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        {prefix} {questions[currentIndex]}
      </div>
    </div>
  );
}
