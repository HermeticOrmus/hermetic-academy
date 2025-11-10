'use client';

import { useEffect, useState } from 'react';

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  realmColor: string;
}

interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
  duration?: number;
}

export function AchievementToast({
  achievement,
  onClose,
  duration = 4000,
}: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 500); // Wait for exit animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [achievement, duration, onClose]);

  if (!achievement) return null;

  return (
    <div className={`achievement-toast ${isVisible ? 'visible' : ''}`}>
      <div className="achievement-icon">{achievement.icon}</div>
      <div className="achievement-content">
        <div className="achievement-badge">Achievement Unlocked!</div>
        <div className="achievement-title">{achievement.title}</div>
        <div className="achievement-description">{achievement.description}</div>
      </div>
      <button className="achievement-close" onClick={onClose} aria-label="Close">
        ×
      </button>

      <style jsx>{`
        .achievement-toast {
          position: fixed;
          top: 100px;
          right: 24px;
          background: rgba(26, 26, 26, 0.95);
          backdrop-filter: blur(20px);
          border: 2px solid ${achievement.realmColor};
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 400px;
          box-shadow:
            0 0 30px ${achievement.realmColor}80,
            0 8px 32px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transform: translateX(500px);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 9999;
        }

        .achievement-toast.visible {
          transform: translateX(0);
          opacity: 1;
        }

        .achievement-icon {
          font-size: 48px;
          flex-shrink: 0;
          animation: bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          filter: drop-shadow(0 0 10px ${achievement.realmColor});
        }

        @keyframes bounce {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        .achievement-content {
          flex: 1;
          min-width: 0;
        }

        .achievement-badge {
          font-size: 10px;
          font-weight: 700;
          color: ${achievement.realmColor};
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }

        .achievement-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .achievement-description {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .achievement-close {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: transparent;
          color: var(--text-tertiary);
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .achievement-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .achievement-toast {
            right: 12px;
            left: 12px;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
}
