'use client';

import { useState } from 'react';

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  maxLevel: number;
  currentLevel: number;
  requiredNodes?: string[];
  realmColor: string;
  position: { x: number; y: number };
}

interface SkillTreeProps {
  nodes: SkillNode[];
  onNodeClick?: (nodeId: string) => void;
  onNodeLevelUp?: (nodeId: string) => void;
}

export function SkillTree({ nodes, onNodeClick, onNodeLevelUp }: SkillTreeProps) {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  const handleNodeClick = (node: SkillNode) => {
    setSelectedNode(node);
    onNodeClick?.(node.id);
  };

  const canUnlock = (node: SkillNode): boolean => {
    if (!node.requiredNodes || node.requiredNodes.length === 0) return true;
    return node.requiredNodes.every((reqId) => {
      const reqNode = nodes.find((n) => n.id === reqId);
      return reqNode?.unlocked || false;
    });
  };

  return (
    <div className="skill-tree-container">
      <div className="skill-tree">
        {/* Connection Lines */}
        <svg className="skill-connections" width="100%" height="100%">
          {nodes.map((node) =>
            node.requiredNodes?.map((reqId) => {
              const reqNode = nodes.find((n) => n.id === reqId);
              if (!reqNode) return null;

              const x1 = reqNode.position.x + 50;
              const y1 = reqNode.position.y + 50;
              const x2 = node.position.x + 50;
              const y2 = node.position.y + 50;

              return (
                <line
                  key={`${reqId}-${node.id}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={node.unlocked ? node.realmColor : '#333333'}
                  strokeWidth={node.unlocked ? '3' : '2'}
                  strokeDasharray={node.unlocked ? '0' : '8 4'}
                  opacity={node.unlocked ? 0.8 : 0.3}
                  className="skill-connection-line"
                />
              );
            })
          )}
        </svg>

        {/* Skill Nodes */}
        {nodes.map((node) => {
          const isAvailable = canUnlock(node);

          return (
            <div
              key={node.id}
              className={`skill-node ${node.unlocked ? 'unlocked' : 'locked'} ${
                !isAvailable ? 'unavailable' : ''
              } ${selectedNode?.id === node.id ? 'selected' : ''}`}
              style={{
                left: `${node.position.x}px`,
                top: `${node.position.y}px`,
                borderColor: node.unlocked ? node.realmColor : '#444444',
              }}
              onClick={() => handleNodeClick(node)}
            >
              <div className="skill-icon">{node.icon}</div>

              {node.unlocked && node.currentLevel > 0 && (
                <div className="skill-level">{node.currentLevel}/{node.maxLevel}</div>
              )}

              {node.unlocked && node.currentLevel < node.maxLevel && (
                <button
                  className="skill-level-up"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNodeLevelUp?.(node.id);
                  }}
                  style={{ borderColor: node.realmColor, color: node.realmColor }}
                >
                  +
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Skill Details Panel */}
      {selectedNode && (
        <div className="skill-details" style={{ borderColor: selectedNode.realmColor }}>
          <div className="skill-details-header">
            <div className="skill-details-icon">{selectedNode.icon}</div>
            <div className="skill-details-info">
              <h3 className="skill-details-name" style={{ color: selectedNode.realmColor }}>
                {selectedNode.name}
              </h3>
              <div className="skill-details-level">
                Level {selectedNode.currentLevel} / {selectedNode.maxLevel}
              </div>
            </div>
          </div>

          <p className="skill-details-description">{selectedNode.description}</p>

          {!selectedNode.unlocked && (
            <div className="skill-details-requirements">
              <div className="requirements-label">Requirements:</div>
              {selectedNode.requiredNodes && selectedNode.requiredNodes.length > 0 ? (
                <ul className="requirements-list">
                  {selectedNode.requiredNodes.map((reqId) => {
                    const reqNode = nodes.find((n) => n.id === reqId);
                    return (
                      <li key={reqId} className={reqNode?.unlocked ? 'met' : 'unmet'}>
                        {reqNode?.unlocked ? '✓' : '✗'} {reqNode?.name}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="requirements-none">No requirements - available now!</div>
              )}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .skill-tree-container {
          display: flex;
          gap: 32px;
          padding: 32px;
          background: rgba(10, 10, 10, 0.8);
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .skill-tree {
          position: relative;
          width: 800px;
          height: 600px;
          background: rgba(26, 26, 26, 0.6);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .skill-connections {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .skill-connection-line {
          transition: all 0.3s;
        }

        .skill-node {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 3px solid;
          background: rgba(10, 10, 10, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          z-index: 2;
        }

        .skill-node.locked {
          filter: grayscale(100%);
          opacity: 0.4;
        }

        .skill-node.unavailable {
          cursor: not-allowed;
          opacity: 0.2;
        }

        .skill-node.unlocked {
          filter: grayscale(0%);
          opacity: 1;
          box-shadow: 0 0 30px currentColor;
        }

        .skill-node.selected {
          transform: scale(1.1);
          box-shadow: 0 0 50px currentColor;
        }

        .skill-node:not(.unavailable):hover {
          transform: scale(1.05);
        }

        .skill-icon {
          font-size: 48px;
        }

        .skill-level {
          position: absolute;
          bottom: -8px;
          right: -8px;
          background: rgba(0, 0, 0, 0.9);
          border: 2px solid currentColor;
          border-radius: 12px;
          padding: 2px 8px;
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: currentColor;
        }

        .skill-level-up {
          position: absolute;
          top: -12px;
          right: -12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid;
          background: rgba(0, 0, 0, 0.9);
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skill-level-up:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px currentColor;
        }

        .skill-details {
          flex: 1;
          min-width: 300px;
          background: rgba(26, 26, 26, 0.9);
          border: 2px solid;
          border-radius: 16px;
          padding: 24px;
          max-height: 600px;
          overflow-y: auto;
        }

        .skill-details-header {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 20px;
        }

        .skill-details-icon {
          font-size: 64px;
          filter: drop-shadow(0 0 15px currentColor);
        }

        .skill-details-info {
          flex: 1;
        }

        .skill-details-name {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
          text-shadow: 0 0 20px currentColor;
        }

        .skill-details-level {
          font-size: 14px;
          color: var(--text-tertiary);
        }

        .skill-details-description {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .skill-details-requirements {
          background: rgba(0, 0, 0, 0.5);
          border-radius: 12px;
          padding: 16px;
        }

        .requirements-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 12px;
        }

        .requirements-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .requirements-list li {
          padding: 8px;
          margin-bottom: 4px;
          border-radius: 6px;
          font-size: 14px;
        }

        .requirements-list li.met {
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }

        .requirements-list li.unmet {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .requirements-none {
          color: #10b981;
          font-size: 14px;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
