'use client';

import { useEffect, useState } from 'react';

interface XPProgressBarProps {
  current: number;
  max: number;
  realmColor: string;
  realmColorLight: string;
  label?: string;
  showNumbers?: boolean;
}

export function XPProgressBar({
  current,
  max,
  realmColor,
  realmColorLight,
  label = 'XP',
  showNumbers = true,
}: XPProgressBarProps) {
  const [displayXP, setDisplayXP] = useState(0);
  const percentage = Math.min((current / max) * 100, 100);

  // Animate XP counting up
  useEffect(() => {
    const duration = 1000; // 1 second
    const steps = 60;
    const increment = current / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayXP(current);
        clearInterval(timer);
      } else {
        setDisplayXP(Math.floor(increment * currentStep));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="xp-bar-container">
      <div className="xp-bar">
        <div
          className="xp-fill"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${realmColor} 0%, ${realmColorLight} 100%)`,
          }}
        >
          {showNumbers && (
            <span className="xp-text">
              {displayXP} / {max} {label}
            </span>
          )}
        </div>
        <div className="xp-glow" />
      </div>

      <style jsx>{`
        .xp-bar-container {
          width: 100%;
        }

        .xp-bar {
          height: 32px;
          background: rgba(10, 10, 10, 0.8);
          border: 2px solid ${realmColor};
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          box-shadow:
            0 0 10px ${realmColor}40,
            inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .xp-fill {
          height: 100%;
          transition: width 1s cubic-bezier(0.4, 0.0, 0.2, 1);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .xp-text {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          text-shadow:
            0 0 8px rgba(0, 0, 0, 0.8),
            0 1px 2px rgba(0, 0, 0, 1);
          z-index: 2;
          position: relative;
        }

        .xp-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          animation: shimmer 2s infinite;
          pointer-events: none;
        }

        @keyframes shimmer {
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
