"use client";

import { useState, useEffect } from "react";

const QUESTIONS = [
  "Why is everyone getting diagnosed with ADHD?",
  "Why are dating apps so terrible?",
  "Why is housing so unaffordable?",
  "Why can't I focus anymore?",
  "Why is everyone so lonely?",
  "Why does nothing feel meaningful?",
  "What's causing the mental health crisis?",
  "Why do I feel stuck in life?",
];

export function QuestionCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % QUESTIONS.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-24 flex items-center justify-center">
      <div
        className={`text-2xl md:text-4xl font-bold text-gray-200 transition-all duration-300 ${
          isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        {QUESTIONS[currentIndex]}
      </div>
    </div>
  );
}
