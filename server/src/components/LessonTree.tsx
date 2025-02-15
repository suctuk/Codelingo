import React from 'react';
import styled from 'styled-components';
import { codeTheme } from '../styles/codeTheme';
import { LessonTreeProps } from '../types';

interface LessonNode {
  id: string;
  title: string;
  type: 'basics' | 'functions' | 'objects' | 'advanced';
  status: 'locked' | 'available' | 'completed' | 'golden';
  position: { x: number; y: number };
  connections: string[];
  xp: number;
  skillLevel: number;
}

const NodeContainer = styled.div<{ 
  $x: number; 
  $y: number; 
  $status: LessonNode['status'];
  $type: 'basics' | 'functions' | 'objects' | 'advanced';
}>`
  position: absolute;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  width: 100px;
  height: 100px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.$status === 'locked' ? 'not-allowed' : 'pointer'};
  background: ${props => {
    const nodeTheme = codeTheme.nodes[props.$type];
    switch (props.$status) {
      case 'locked': return codeTheme.colors.sidebar;
      case 'available': return nodeTheme.background;
      case 'completed': return codeTheme.colors.syntax.function;
      case 'golden': return 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
      default: return codeTheme.colors.sidebar;
    }
  }};
  border: 2px solid ${props => 
    props.$status === 'locked' 
      ? codeTheme.colors.syntax.comment 
      : 'transparent'};
  transition: all ${codeTheme.animation.fast};
  
  &:hover {
    transform: ${props => props.$status !== 'locked' ? 'scale(1.1)' : 'none'};
    box-shadow: ${props => props.$status !== 'locked' 
      ? '0 0 20px rgba(88, 204, 2, 0.3)' 
      : 'none'};
  }

  &::before {
    content: '${props => codeTheme.nodes[props.$type].icon}';
    font-size: 24px;
    margin-bottom: 8px;
    color: ${props => 
      props.$status === 'locked' 
        ? codeTheme.colors.syntax.comment 
        : codeTheme.colors.text.primary};
  }
`;

const Connection = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
`;

const ConnectionLine = styled.path<{ $completed: boolean; $golden: boolean }>`
  stroke: ${props => {
    if (props.$golden) return '#FFD700';
    return props.$completed ? codeTheme.colors.syntax.function : codeTheme.colors.syntax.comment;
  }};
  stroke-width: 3;
  stroke-dasharray: ${props => props.$completed ? 'none' : '5,5'};
  filter: ${props => props.$golden ? 'drop-shadow(0 0 2px #FFD700)' : 'none'};
`;

const SkillCrown = styled.div<{ $level: number }>`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background: ${props => props.$level === 5 ? '#FFD700' : codeTheme.colors.syntax.function};
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  
  &::after {
    content: '${props => props.$level}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    font-weight: bold;
    color: ${codeTheme.colors.background};
  }
`;

const NodeTitle = styled.div<{ $locked: boolean }>`
  font-size: 14px;
  font-weight: bold;
  color: ${props => 
    props.$locked 
      ? codeTheme.colors.syntax.comment 
      : codeTheme.colors.text.primary};
  text-align: center;
  margin-top: 4px;
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const XPBadge = styled.div<{ $locked: boolean }>`
  position: absolute;
  bottom: -10px;
  right: -10px;
  background: ${props => 
    props.$locked 
      ? codeTheme.colors.syntax.comment 
      : codeTheme.colors.syntax.number};
  color: ${codeTheme.colors.background};
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const LessonTree: React.FC<LessonTreeProps> = ({ nodes, onNodeClick }) => {
  const drawConnections = () => {
    const validConnections = nodes.flatMap(node => 
      node.connections
        .map(targetId => {
          const target = nodes.find(n => n.id === targetId);
          if (!target) return null;

          const isCompleted = node.status === 'completed' || node.status === 'golden';
          const isGolden = node.status === 'golden' && target.status === 'golden';

          // Create curved path
          const x1 = node.position.x + 50;
          const y1 = node.position.y + 50;
          const x2 = target.position.x + 50;
          const y2 = target.position.y + 50;
          
          const dx = x2 - x1;
          const dy = y2 - y1;
          const curve = Math.min(Math.abs(dx), Math.abs(dy)) * 0.5;
          
          const path = `
            M ${x1} ${y1}
            C ${x1 + curve} ${y1},
              ${x2 - curve} ${y2},
              ${x2} ${y2}
          `;

          return (
            <ConnectionLine
              key={`${node.id}-${targetId}`}
              d={path}
              $completed={isCompleted}
              $golden={isGolden}
              data-testid={`connection-${node.id}-${targetId}`}
            />
          );
        })
        .filter(Boolean) // Remove null connections
    );

    return validConnections;
  };

  return (
    <div 
      style={{ position: 'relative', width: '100%', height: '100%' }}
      data-testid="lesson-tree"
    >
      <Connection data-testid="connections-container">
        {drawConnections()}
      </Connection>
      {nodes.map(node => (
        <NodeContainer
          key={node.id}
          $x={node.position.x}
          $y={node.position.y}
          $status={node.status}
          $type={node.type}
          onClick={() => node.status !== 'locked' && onNodeClick(node.id)}
          data-testid={`node-${node.id}`}
          aria-label={`${node.title} - ${node.status} - ${node.xp} XP`}
          role="button"
          tabIndex={node.status === 'locked' ? -1 : 0}
          aria-disabled={node.status === 'locked'}
        >
          {node.skillLevel > 0 && (
            <SkillCrown 
              $level={node.skillLevel}
              data-testid={`crown-${node.id}`}
              aria-label={`Skill Level ${node.skillLevel}`}
            />
          )}
          <NodeTitle 
            $locked={node.status === 'locked'}
            data-testid={`title-${node.id}`}
          >
            {node.title}
          </NodeTitle>
          <XPBadge 
            $locked={node.status === 'locked'}
            data-testid={`xp-${node.id}`}
          >
            {node.xp} XP
          </XPBadge>
        </NodeContainer>
      ))}
    </div>
  );
};
