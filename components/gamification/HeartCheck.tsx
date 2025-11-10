'use client';

import { useState } from 'react';

export type HeartFeeling = 'joyful' | 'peaceful' | 'curious' | 'uncertain' | 'overwhelmed';

interface HeartCheckProps {
  onFeelingSelect?: (feeling: HeartFeeling) => void;
}

const FEELINGS: Record<HeartFeeling, { icon: string; label: string; color: string }> = {
  joyful: {
    icon: '😊',
    label: 'Joyful',
    color: '#F77F00',
  },
  peaceful: {
    icon: '🌙',
    label: 'Peaceful',
    color: '#9D4EDD',
  },
  curious: {
    icon: '🔍',
    label: 'Curious',
    color: '#4CC9F0',
  },
  uncertain: {
    icon: '🤔',
    label: 'Uncertain',
    color: '#60A5FA',
  },
  overwhelmed: {
    icon: '😓',
    label: 'Overwhelmed',
    color: '#EC4899',
  },
};

export function HeartCheck({ onFeelingSelect }: HeartCheckProps) {
  const [selectedFeeling, setSelectedFeeling] = useState<HeartFeeling | null>(null);

  const handleSelect = (feeling: HeartFeeling) => {
    setSelectedFeeling(feeling);
    onFeelingSelect?.(feeling);
  };

  return (
    <div className="heart-check">
      <div className="heart-header">
        <div className="heart-icon">💛</div>
        <div className="heart-title">
          <h3>How does your heart feel right now?</h3>
          <p>No right or wrong answer. Just notice.</p>
        </div>
      </div>

      <div className="feeling-options">
        {(Object.keys(FEELINGS) as HeartFeeling[]).map((feeling) => {
          const { icon, label, color } = FEELINGS[feeling];
          const isSelected = selectedFeeling === feeling;

          return (
            <button
              key={feeling}
              className={`feeling-option ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(feeling)}
              style={{
                borderColor: isSelected ? color : 'rgba(255, 255, 255, 0.2)',
                background: isSelected ? `${color}20` : 'rgba(26, 26, 26, 0.8)',
              }}
            >
              <div className="feeling-icon">{icon}</div>
              <div className="feeling-label" style={{ color: isSelected ? color : 'var(--text-secondary)' }}>
                {label}
              </div>
            </button>
          );
        })}
      </div>

      {selectedFeeling && (
        <div className="heart-response">
          {selectedFeeling === 'joyful' && (
            <p>✨ Beautiful! Let that joy guide your practice today.</p>
          )}
          {selectedFeeling === 'peaceful' && (
            <p>🌙 Wonderful. This peaceful state is perfect for deepening.</p>
          )}
          {selectedFeeling === 'curious' && (
            <p>🔍 Curiosity is the doorway to wisdom. Follow it.</p>
          )}
          {selectedFeeling === 'uncertain' && (
            <p>🤔 Uncertainty is honest. Start with something gentle today.</p>
          )}
          {selectedFeeling === 'overwhelmed' && (
            <p>💛 You're seen. Consider: rest, or choose the gentlest invitation.</p>
          )}
        </div>
      )}

      <style jsx>{`
        .heart-check {
          background: rgba(26, 26, 26, 0.9);
          border: 2px solid rgba(212, 175, 55, 0.4);
          border-radius: 16px;
          padding: 24px;
          box-shadow:
            0 0 20px rgba(212, 175, 55, 0.2),
            inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .heart-header {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          align-items: flex-start;
        }

        .heart-icon {
          font-size: 48px;
          filter: drop-shadow(0 0 10px var(--gold-glow));
          animation: heart-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes heart-pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .heart-title h3 {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--gold-divine);
          margin: 0 0 8px 0;
        }

        .heart-title p {
          font-size: 14px;
          color: var(--text-tertiary);
          margin: 0;
          font-style: italic;
        }

        .feeling-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .feeling-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 16px;
          border: 2px solid;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .feeling-option:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .feeling-option.selected {
          box-shadow: 0 0 20px currentColor;
        }

        .feeling-icon {
          font-size: 36px;
        }

        .feeling-label {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          transition: color 0.3s;
        }

        .heart-response {
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid var(--gold-divine);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }

        .heart-response p {
          margin: 0;
          color: var(--gold-divine);
          font-size: 15px;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
