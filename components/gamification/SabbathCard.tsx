'use client';

interface SabbathCardProps {
  weekNumber?: number;
}

export function SabbathCard({ weekNumber = 1 }: SabbathCardProps) {
  return (
    <div className="sabbath-card">
      <div className="sabbath-header">
        <div className="sabbath-icon">🌙</div>
        <div className="sabbath-title">
          <h3>Day 7: Cooldown</h3>
          <p>Week {weekNumber} Mana Regen</p>
        </div>
      </div>

      <div className="sabbath-content">
        <div className="sabbath-section">
          <h4>🌅 Cooldown Day Activities:</h4>
          <ul>
            <li>Rest (recharge your mental mana)</li>
            <li>Review the week (what worked, what didn't)</li>
            <li>Let it sink in (no forcing, just integrating)</li>
            <li>Celebrate your streak (you earned it)</li>
            <li>No grind. Just exist.</li>
          </ul>
        </div>

        <div className="sabbath-section">
          <h4>✨ Optional Side Activities:</h4>
          <div className="sabbath-invitations">
            <div className="sabbath-invitation">
              <span className="inv-icon">📖</span>
              <span className="inv-text">Journal one insight from this week</span>
            </div>
            <div className="sabbath-invitation">
              <span className="inv-icon">🌳</span>
              <span className="inv-text">Touch grass (literally)</span>
            </div>
            <div className="sabbath-invitation">
              <span className="inv-icon">🎨</span>
              <span className="inv-text">Make something for fun (no goals)</span>
            </div>
            <div className="sabbath-invitation">
              <span className="inv-icon">💛</span>
              <span className="inv-text">Hang with people you actually like</span>
            </div>
          </div>
        </div>

        <div className="sabbath-wisdom">
          <p>
            <em>
              "Cooldowns aren't downtime. They're when your mana regenerates."
            </em>
          </p>
          <p className="wisdom-sub">
            — The Hermetic Principle of Rhythm (but make it gaming)
          </p>
        </div>
      </div>

      <style jsx>{`
        .sabbath-card {
          background: linear-gradient(
            135deg,
            rgba(157, 78, 221, 0.15) 0%,
            rgba(26, 26, 26, 0.9) 50%,
            rgba(157, 78, 221, 0.15) 100%
          );
          border: 3px solid #9D4EDD;
          border-radius: 20px;
          padding: 28px;
          box-shadow:
            0 0 40px rgba(157, 78, 221, 0.4),
            inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .sabbath-header {
          display: flex;
          gap: 16px;
          margin-bottom: 28px;
          align-items: center;
        }

        .sabbath-icon {
          font-size: 56px;
          filter: drop-shadow(0 0 15px #9D4EDD);
          animation: moon-glow 3s ease-in-out infinite;
        }

        @keyframes moon-glow {
          0%,
          100% {
            filter: drop-shadow(0 0 15px #9D4EDD);
          }
          50% {
            filter: drop-shadow(0 0 25px #9D4EDD);
          }
        }

        .sabbath-title h3 {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          color: #9D4EDD;
          margin: 0 0 6px 0;
          text-shadow: 0 0 20px rgba(157, 78, 221, 0.6);
        }

        .sabbath-title p {
          font-size: 14px;
          color: var(--text-tertiary);
          margin: 0;
        }

        .sabbath-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sabbath-section h4 {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 12px 0;
        }

        .sabbath-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sabbath-section li {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.8;
          padding-left: 24px;
          position: relative;
        }

        .sabbath-section li::before {
          content: '•';
          position: absolute;
          left: 8px;
          color: #9D4EDD;
          font-size: 18px;
        }

        .sabbath-invitations {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sabbath-invitation {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(157, 78, 221, 0.1);
          border: 1px solid rgba(157, 78, 221, 0.3);
          border-radius: 10px;
          transition: all 0.3s;
        }

        .sabbath-invitation:hover {
          background: rgba(157, 78, 221, 0.15);
          border-color: rgba(157, 78, 221, 0.5);
          transform: translateX(4px);
        }

        .inv-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .inv-text {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .sabbath-wisdom {
          background: rgba(0, 0, 0, 0.4);
          border-left: 4px solid #9D4EDD;
          padding: 16px 20px;
          border-radius: 8px;
        }

        .sabbath-wisdom p {
          margin: 0;
          color: var(--text-primary);
          font-size: 16px;
          line-height: 1.6;
        }

        .wisdom-sub {
          margin-top: 8px !important;
          font-size: 13px !important;
          color: var(--text-tertiary) !important;
        }
      `}</style>
    </div>
  );
}
