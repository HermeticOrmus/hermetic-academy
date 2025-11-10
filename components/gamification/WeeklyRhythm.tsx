'use client';

interface WeeklyRhythmProps {
  activeDaysThisWeek: number; // 0-7
  currentStreak?: number; // Total weeks with 6+ days
  lastActiveDate?: Date;
}

export function WeeklyRhythm({
  activeDaysThisWeek,
  currentStreak = 0,
  lastActiveDate,
}: WeeklyRhythmProps) {
  // Sabbath grace - 6 out of 7 is perfect rhythm
  const isSabbathHonored = activeDaysThisWeek >= 6;
  const isRestDay = activeDaysThisWeek === 7; // They came on Day 7!

  return (
    <div className="weekly-rhythm">
      <div className="rhythm-header">
        <div className="rhythm-icon">
          {isSabbathHonored ? '🌙' : '☀️'}
        </div>
        <div className="rhythm-content">
          <div className="rhythm-label">Your Rotation</div>
          <div className="rhythm-days">
            {activeDaysThisWeek}/7 days this week
          </div>
          {currentStreak > 0 && (
            <div className="rhythm-streak">
              {currentStreak} {currentStreak === 1 ? 'week' : 'weeks'} streak - clean rotation
            </div>
          )}
        </div>
      </div>

      <div className="rhythm-visualization">
        {[0, 1, 2, 3, 4, 5, 6].map((day) => (
          <div
            key={day}
            className={`day-circle ${day < activeDaysThisWeek ? 'active' : 'inactive'} ${
              day === 6 ? 'sabbath' : ''
            }`}
          >
            {day === 6 ? (
              <span className="day-label">CD</span>
            ) : (
              <span className="day-label">{day + 1}</span>
            )}
          </div>
        ))}
      </div>

      {/* Wisdom Messages */}
      {activeDaysThisWeek === 0 && (
        <div className="rhythm-message welcome">
          <p>🌱 Start when you're ready.</p>
          <p className="message-sub">No timer. No rush. Just you vs you.</p>
        </div>
      )}

      {activeDaysThisWeek > 0 && activeDaysThisWeek < 6 && (
        <div className="rhythm-message encouraging">
          <p>✨ {activeDaysThisWeek} {activeDaysThisWeek === 1 ? 'day' : 'days'} active this week!</p>
          <p className="message-sub">Clean rotation building. Keep it up when ready.</p>
        </div>
      )}

      {isSabbathHonored && !isRestDay && (
        <div className="rhythm-message sacred">
          <p>🌙 Clean rotation complete - 6 days active!</p>
          <p className="message-sub">Day 7 = Cooldown. No XP farming. Pure mana regen.</p>
        </div>
      )}

      {isRestDay && (
        <div className="rhythm-message sabbath">
          <p>💛 It's Day 7 (Cooldown Day)</p>
          <p className="message-sub">
            No grind today. Reflect, integrate, touch grass if you want.
            <br />
            Mana regen day. Come back tomorrow recharged.
          </p>
        </div>
      )}

      <style jsx>{`
        .weekly-rhythm {
          background: rgba(26, 26, 26, 0.8);
          border: 2px solid var(--gold-divine);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow:
            0 0 20px var(--gold-glow),
            inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .rhythm-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .rhythm-icon {
          font-size: 48px;
          filter: drop-shadow(0 0 10px var(--gold-divine));
          animation: gentle-pulse 3s ease-in-out infinite;
        }

        @keyframes gentle-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        .rhythm-content {
          flex: 1;
        }

        .rhythm-label {
          font-size: 12px;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }

        .rhythm-days {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 700;
          color: var(--gold-divine);
          text-shadow: 0 0 15px var(--gold-glow);
        }

        .rhythm-streak {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 4px;
          font-style: italic;
        }

        .rhythm-visualization {
          display: flex;
          gap: 8px;
          justify-content: center;
          padding: 16px 0;
        }

        .day-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid;
          transition: all 0.3s;
          position: relative;
        }

        .day-circle.active {
          background: var(--gold-divine);
          border-color: var(--gold-divine);
          box-shadow: 0 0 15px var(--gold-glow);
        }

        .day-circle.inactive {
          background: rgba(100, 100, 100, 0.2);
          border-color: rgba(150, 150, 150, 0.3);
        }

        .day-circle.sabbath {
          border-style: dashed;
        }

        .day-circle.sabbath.active {
          background: #9D4EDD;
          border-color: #9D4EDD;
          box-shadow: 0 0 15px #9D4EDD80;
        }

        .day-label {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: ${activeDaysThisWeek >= 6 ? '#000000' : 'var(--text-tertiary)'};
        }

        .day-circle.sabbath .day-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .rhythm-message {
          padding: 16px;
          border-radius: 12px;
          border: 2px solid;
          text-align: center;
        }

        .rhythm-message p {
          margin: 0;
          font-size: 15px;
          line-height: 1.5;
        }

        .message-sub {
          margin-top: 8px !important;
          font-size: 13px !important;
          color: var(--text-tertiary) !important;
        }

        .rhythm-message.welcome {
          background: rgba(76, 201, 240, 0.1);
          border-color: #4CC9F0;
          color: #4CC9F0;
        }

        .rhythm-message.encouraging {
          background: rgba(247, 127, 0, 0.1);
          border-color: #F77F00;
          color: #F77F00;
        }

        .rhythm-message.sacred {
          background: rgba(212, 175, 55, 0.1);
          border-color: var(--gold-divine);
          color: var(--gold-divine);
        }

        .rhythm-message.sabbath {
          background: rgba(157, 78, 221, 0.1);
          border-color: #9D4EDD;
          color: #9D4EDD;
        }
      `}</style>
    </div>
  );
}
