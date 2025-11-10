'use client';

import { useEffect, useState } from 'react';

interface WisdomProgressProps {
  current: number;
  max: number;
  realmColor: string;
  realmColorLight: string;
  label?: string;
  showNumbers?: boolean;
}

export function WisdomProgress({
  current,
  max,
  realmColor,
  realmColorLight,
  label = 'Wisdom',
  showNumbers = true,
}: WisdomProgressProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = Math.min((current / max) * 100, 100);

  // Gentle counting animation (slower, more meditative)
  useEffect(() => {
    const duration = 1500; // 1.5 seconds (slower than XP)
    const steps = 60;
    const increment = current / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(current);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(increment * currentStep));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="wisdom-progress-container">
      <div className="wisdom-bar">
        <div
          className="wisdom-fill"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${realmColor}60 0%, ${realmColor} 50%, ${realmColorLight} 100%)`,
          }}
        >
          {showNumbers && (
            <span className="wisdom-text">
              {displayValue} / {max} {label}
            </span>
          )}
        </div>
        <div className="wisdom-shimmer" />
      </div>

      <style jsx>{`
        .wisdom-progress-container {
          width: 100%;
        }

        .wisdom-bar {
          height: 28px;
          background: rgba(10, 10, 10, 0.8);
          border: 2px solid ${realmColor}60;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          box-shadow:
            0 0 10px ${realmColor}30,
            inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .wisdom-fill {
          height: 100%;
          transition: width 1.5s cubic-bezier(0.4, 0.0, 0.2, 1);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 0 15px ${realmColor}60;
        }

        .wisdom-text {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          text-shadow:
            0 0 8px rgba(0, 0, 0, 0.8),
            0 1px 2px rgba(0, 0, 0, 1);
          z-index: 2;
          position: relative;
          letter-spacing: 0.02em;
        }

        .wisdom-shimmer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 100%
          );
          animation: shimmer-slow 3s infinite;
          pointer-events: none;
        }

        @keyframes shimmer-slow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}
