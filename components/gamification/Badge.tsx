'use client';

import { useState, useEffect } from 'react';

interface BadgeProps {
  icon: string;
  name: string;
  description: string;
  realmColor: string;
  unlocked: boolean;
  onUnlock?: () => void;
}

export function Badge({
  icon,
  name,
  description,
  realmColor,
  unlocked,
  onUnlock,
}: BadgeProps) {
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    if (unlocked && !isUnlocking) {
      setIsUnlocking(true);
      onUnlock?.();

      // Reset animation state after completion
      setTimeout(() => {
        setIsUnlocking(false);
      }, 1000);
    }
  }, [unlocked, isUnlocking, onUnlock]);

  return (
    <div className={`badge ${unlocked ? 'unlocked' : 'locked'} ${isUnlocking ? 'unlocking' : ''}`}>
      <div className="badge-container">
        <div className="badge-icon">{icon}</div>
        {unlocked && <div className="badge-glow" />}
      </div>
      <div className="badge-info">
        <div className="badge-name">{name}</div>
        <div className="badge-description">{description}</div>
      </div>

      <style jsx>{`
        .badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          transition: all 0.4s;
        }

        .badge-container {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(26, 26, 26, 0.8);
          border: 3px solid ${realmColor}40;
          transition: all 0.4s;
        }

        .badge.locked .badge-container {
          filter: grayscale(100%);
          opacity: 0.3;
        }

        .badge.unlocked .badge-container {
          filter: grayscale(0%);
          opacity: 1;
          border-color: ${realmColor};
          box-shadow:
            0 0 20px ${realmColor}80,
            0 0 40px ${realmColor}40;
        }

        .badge.unlocking .badge-container {
          animation: badge-unlock 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes badge-unlock {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          70% {
            transform: scale(1.2) rotate(10deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .badge-icon {
          font-size: 40px;
          transition: all 0.3s;
        }

        .badge.unlocked .badge-icon {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .badge-glow {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            ${realmColor}80 0%,
            ${realmColor}40 30%,
            transparent 70%
          );
          opacity: 0;
          animation: pulse-glow 2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes pulse-glow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        .badge-info {
          text-align: center;
          max-width: 120px;
        }

        .badge-name {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: ${unlocked ? realmColor : 'var(--text-tertiary)'};
          margin-bottom: 4px;
          transition: color 0.4s;
        }

        .badge-description {
          font-size: 12px;
          color: var(--text-tertiary);
          opacity: ${unlocked ? 1 : 0.5};
          transition: opacity 0.4s;
        }
      `}</style>
    </div>
  );
}
