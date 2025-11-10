'use client';

import { useState } from 'react';

interface ReflectionPromptProps {
  principle: string;
  prompts: string[];
  onReflectionSave?: (reflection: string) => void;
}

export function ReflectionPrompt({ principle, prompts, onReflectionSave }: ReflectionPromptProps) {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (reflection.trim()) {
      onReflectionSave?.(reflection);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="reflection-prompt">
      <div className="reflection-header">
        <h3>💭 Reflect on {principle}</h3>
        <p>Wisdom deepens through reflection, not just action.</p>
      </div>

      <div className="prompt-selector">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            className={`prompt-option ${selectedPrompt === index ? 'selected' : ''}`}
            onClick={() => setSelectedPrompt(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="prompt-question">
        <span className="prompt-icon">❓</span>
        <p>{prompts[selectedPrompt]}</p>
      </div>

      <div className="reflection-input">
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write your thoughts here... Take your time. There's no rush."
          rows={6}
        />
      </div>

      <div className="reflection-actions">
        <button
          onClick={handleSave}
          className={`save-btn ${isSaved ? 'saved' : ''}`}
          disabled={!reflection.trim()}
        >
          {isSaved ? '✓ Saved' : 'Save Reflection'}
        </button>
      </div>

      {isSaved && (
        <div className="saved-message">
          <p>✨ Your reflection has been saved. This wisdom is yours to keep.</p>
        </div>
      )}

      <style jsx>{`
        .reflection-prompt {
          background: rgba(26, 26, 26, 0.9);
          border: 2px solid rgba(76, 201, 240, 0.4);
          border-radius: 16px;
          padding: 24px;
          box-shadow:
            0 0 20px rgba(76, 201, 240, 0.2),
            inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .reflection-header {
          margin-bottom: 20px;
        }

        .reflection-header h3 {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: #4CC9F0;
          margin: 0 0 8px 0;
        }

        .reflection-header p {
          font-size: 14px;
          color: var(--text-tertiary);
          margin: 0;
          font-style: italic;
        }

        .prompt-selector {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .prompt-option {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(76, 201, 240, 0.3);
          background: rgba(26, 26, 26, 0.8);
          color: var(--text-tertiary);
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }

        .prompt-option:hover {
          border-color: rgba(76, 201, 240, 0.6);
          transform: scale(1.1);
        }

        .prompt-option.selected {
          border-color: #4CC9F0;
          background: rgba(76, 201, 240, 0.2);
          color: #4CC9F0;
          box-shadow: 0 0 15px rgba(76, 201, 240, 0.4);
        }

        .prompt-question {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 16px;
          background: rgba(76, 201, 240, 0.1);
          border-left: 4px solid #4CC9F0;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .prompt-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .prompt-question p {
          margin: 0;
          font-size: 16px;
          color: var(--text-primary);
          line-height: 1.6;
        }

        .reflection-input {
          margin-bottom: 16px;
        }

        .reflection-input textarea {
          width: 100%;
          padding: 16px;
          background: rgba(10, 10, 10, 0.6);
          border: 2px solid rgba(76, 201, 240, 0.3);
          border-radius: 12px;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.6;
          resize: vertical;
          transition: all 0.3s;
        }

        .reflection-input textarea:focus {
          outline: none;
          border-color: #4CC9F0;
          box-shadow: 0 0 20px rgba(76, 201, 240, 0.3);
        }

        .reflection-input textarea::placeholder {
          color: var(--text-tertiary);
          font-style: italic;
        }

        .reflection-actions {
          display: flex;
          justify-content: flex-end;
        }

        .save-btn {
          padding: 12px 28px;
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 600;
          background: rgba(76, 201, 240, 0.2);
          border: 2px solid #4CC9F0;
          border-radius: 12px;
          color: #4CC9F0;
          cursor: pointer;
          transition: all 0.3s;
        }

        .save-btn:hover:not(:disabled) {
          background: rgba(76, 201, 240, 0.3);
          box-shadow: 0 0 20px rgba(76, 201, 240, 0.5);
          transform: translateY(-2px);
        }

        .save-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .save-btn.saved {
          background: rgba(16, 185, 129, 0.3);
          border-color: #10b981;
          color: #10b981;
        }

        .saved-message {
          margin-top: 16px;
          padding: 12px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid #10b981;
          border-radius: 8px;
          text-align: center;
          animation: fade-in 0.3s;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .saved-message p {
          margin: 0;
          color: #10b981;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
