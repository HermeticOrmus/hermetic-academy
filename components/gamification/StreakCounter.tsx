'use client';

interface StreakCounterProps {
  streakDays: number;
  label?: string;
}

export function StreakCounter({ streakDays, label = 'Day Streak' }: StreakCounterProps) {
  return (
    <div className="streak-counter">
      <div className="flame-icon">🔥</div>
      <div className="streak-content">
        <div className="streak-number">{streakDays}</div>
        <div className="streak-label">{label}</div>
      </div>

      <style jsx>{`
        .streak-counter {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: rgba(26, 26, 26, 0.8);
          border-radius: 12px;
          border: 2px solid var(--gold-divine);
          box-shadow:
            0 0 20px var(--gold-glow),
            inset 0 2px 4px rgba(0, 0, 0, 0.5);
          transition: all 0.3s;
        }

        .streak-counter:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 30px var(--gold-glow),
            inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .flame-icon {
          font-size: 32px;
          animation: flicker 1.5s ease-in-out infinite;
          filter: drop-shadow(0 0 8px rgba(255, 140, 0, 0.8));
        }

        @keyframes flicker {
          0%,
          100% {
            transform: scale(1) translateY(0);
            filter: drop-shadow(0 0 8px rgba(255, 140, 0, 0.8)) brightness(1);
          }
          50% {
            transform: scale(1.1) translateY(-2px);
            filter: drop-shadow(0 0 12px rgba(255, 140, 0, 1)) brightness(1.3);
          }
        }

        .streak-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .streak-number {
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 700;
          color: var(--gold-divine);
          font-style: italic;
          line-height: 1;
          text-shadow: 0 0 10px var(--gold-glow);
        }

        .streak-label {
          font-size: 12px;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
}
