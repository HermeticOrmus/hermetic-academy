"use client";

import { useState, useRef, useEffect } from "react";
import { Principle } from "@/lib/constants";

/**
 * Mentalism Experience: Mind Map Builder
 *
 * WHY: Show how thoughts connect and create reality cascades
 *
 * GAMING-NATIVE LANGUAGE:
 * - Nodes = "Thoughts"
 * - Connections = "Links"
 * - Center node = "Core Belief"
 * - Teaching: Your mental build determines your reality raid boss
 */

interface ThoughtNode {
  id: string;
  text: string;
  x: number;
  y: number;
  parentId?: string;
}

export default function MentalismExperience({ principle }: { principle: Principle }) {
  const [nodes, setNodes] = useState<ThoughtNode[]>([
    { id: "root", text: "I am capable", x: 400, y: 300 }
  ]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [newNodeText, setNewNodeText] = useState("");
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Add new thought node
  const addNode = (parentId: string) => {
    if (!newNodeText.trim()) return;

    const parent = nodes.find(n => n.id === parentId);
    if (!parent) return;

    // Calculate position around parent (circular layout)
    const angle = Math.random() * Math.PI * 2;
    const radius = 120;
    const newNode: ThoughtNode = {
      id: Date.now().toString(),
      text: newNodeText,
      x: parent.x + Math.cos(angle) * radius,
      y: parent.y + Math.sin(angle) * radius,
      parentId: parentId
    };

    setNodes([...nodes, newNode]);
    setNewNodeText("");
    setIsAddingNode(false);
    setSelectedNode(null);
  };

  // Delete node and its children
  const deleteNode = (nodeId: string) => {
    if (nodeId === "root") return; // Can't delete root

    const deleteRecursive = (id: string): string[] => {
      const children = nodes.filter(n => n.parentId === id);
      const toDelete = [id];
      children.forEach(child => {
        toDelete.push(...deleteRecursive(child.id));
      });
      return toDelete;
    };

    const idsToDelete = deleteRecursive(nodeId);
    setNodes(nodes.filter(n => !idsToDelete.includes(n.id)));
    setSelectedNode(null);
  };

  // Edit node text
  const editNode = (nodeId: string, newText: string) => {
    setNodes(nodes.map(n =>
      n.id === nodeId ? { ...n, text: newText } : n
    ));
  };

  // Reset to default
  const resetMap = () => {
    setNodes([{ id: "root", text: "I am capable", x: 400, y: 300 }]);
    setSelectedNode(null);
  };

  // Mouse handling for dragging
  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    setDraggedNode(nodeId);
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedNode || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    setNodes(nodes.map(n =>
      n.id === draggedNode ? { ...n, x, y } : n
    ));
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  // Example prompts
  const examplePrompts = [
    "I am capable",
    "I deserve success",
    "I learn from failure",
    "I control my response",
    "I am responsible"
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2" style={{ color: principle.color.primary }}>
          Mind Map Builder
        </h3>
        <p className="text-gray-400">
          Your core belief = your build. Change the center, watch everything shift.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div
        ref={canvasRef}
        className="relative min-h-[500px] bg-gray-900/50 rounded-xl border-2 overflow-hidden"
        style={{ borderColor: principle.color.primary + "40" }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Draw connections */}
        <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
          {nodes.map(node => {
            if (!node.parentId) return null;
            const parent = nodes.find(n => n.id === node.parentId);
            if (!parent) return null;

            return (
              <line
                key={`${parent.id}-${node.id}`}
                x1={parent.x}
                y1={parent.y}
                x2={node.x}
                y2={node.y}
                stroke={principle.color.primary}
                strokeWidth="2"
                opacity="0.4"
              />
            );
          })}
        </svg>

        {/* Draw nodes */}
        {nodes.map(node => (
          <div
            key={node.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-move ${
              selectedNode === node.id ? 'ring-2' : ''
            }`}
            style={{
              left: node.x,
              top: node.y,
              ...(selectedNode === node.id && { borderColor: principle.color.primary })
            }}
            onMouseDown={(e) => {
              handleMouseDown(e, node.id);
              setSelectedNode(node.id);
            }}
          >
            <div
              className={`px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-all ${
                node.id === "root" ? 'text-white' : 'text-gray-200'
              }`}
              style={{
                backgroundColor: node.id === "root"
                  ? principle.color.primary
                  : principle.color.primary + "60",
                border: selectedNode === node.id ? `2px solid ${principle.color.primary}` : 'none'
              }}
            >
              {node.text}
            </div>
          </div>
        ))}

        {/* Empty state */}
        {nodes.length === 1 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-gray-500 text-sm">
              Click the core belief to add connected thoughts →
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-center">
        {selectedNode && !isAddingNode && (
          <>
            <button
              onClick={() => setIsAddingNode(true)}
              className="px-4 py-2 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: principle.color.primary + "20",
                color: principle.color.primary,
                border: `1px solid ${principle.color.primary}40`
              }}
            >
              + Add Thought
            </button>
            <button
              onClick={() => {
                const text = prompt("Edit thought:", nodes.find(n => n.id === selectedNode)?.text);
                if (text) editNode(selectedNode, text);
              }}
              className="px-4 py-2 rounded-lg font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all"
            >
              ✏️ Edit
            </button>
            {selectedNode !== "root" && (
              <button
                onClick={() => deleteNode(selectedNode)}
                className="px-4 py-2 rounded-lg font-medium bg-red-900/20 text-red-400 hover:bg-red-900/30 transition-all"
              >
                🗑️ Delete
              </button>
            )}
          </>
        )}

        <button
          onClick={resetMap}
          className="px-4 py-2 rounded-lg font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all"
        >
          🔄 Reset
        </button>
      </div>

      {/* Add thought input */}
      {isAddingNode && selectedNode && (
        <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
          <h4 className="text-lg font-semibold text-gray-200">
            What thought comes from "{nodes.find(n => n.id === selectedNode)?.text}"?
          </h4>
          <div className="flex gap-3">
            <input
              type="text"
              value={newNodeText}
              onChange={(e) => setNewNodeText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addNode(selectedNode)}
              placeholder="Type a thought..."
              className="flex-1 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': principle.color.primary } as React.CSSProperties}
              autoFocus
            />
            <button
              onClick={() => addNode(selectedNode)}
              className="px-6 py-2 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: principle.color.primary,
                color: 'white'
              }}
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingNode(false);
                setNewNodeText("");
              }}
              className="px-4 py-2 rounded-lg font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Example prompts */}
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">Try these core beliefs:</h4>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => {
                setNodes([{ id: "root", text: prompt, x: 400, y: 300 }]);
                setSelectedNode(null);
              }}
              className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Teaching */}
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">The Mental Diff</h4>
        <p className="text-gray-300">
          Go into ranked with "I'm bad at this game" as your core belief. Watch how every thought that follows confirms it:
          <span className="text-gray-400 block mt-2 ml-4">
            → "I'll probably lose lane"<br/>
            → "My team will blame me"<br/>
            → "I should play safe and not int"<br/>
            → Result: Passive, scared, lose anyway
          </span>
        </p>
        <p className="text-gray-300">
          Now start with "I'm here to learn and improve." Different cascade:
          <span className="text-gray-400 block mt-2 ml-4">
            → "This matchup teaches me something"<br/>
            → "Mistakes = data for improvement"<br/>
            → "I'll try that risky play"<br/>
            → Result: Growth mindset, better plays, climb
          </span>
        </p>
        <p className="text-gray-300 font-semibold mt-4" style={{ color: principle.color.primary }}>
          Same game. Same mechanics. Different core belief = different reality.
        </p>
      </div>
    </div>
  );
}
