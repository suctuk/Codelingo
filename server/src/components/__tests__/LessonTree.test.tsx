import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { LessonTree } from '../LessonTree';
import { codeTheme } from '../../styles/codeTheme';
import { LessonNode } from '../../types';

const mockNodes: LessonNode[] = [
  {
    id: 'basics_1',
    title: 'Variables',
    type: 'basics',
    status: 'completed',
    position: { x: 100, y: 100 },
    connections: ['basics_2'],
    xp: 30,
    skillLevel: 3
  },
  {
    id: 'basics_2',
    title: 'Data Types',
    type: 'basics',
    status: 'available',
    position: { x: 200, y: 100 },
    connections: ['basics_3'],
    xp: 40,
    skillLevel: 0
  },
  {
    id: 'basics_3',
    title: 'Control Flow',
    type: 'basics',
    status: 'locked',
    position: { x: 300, y: 100 },
    connections: [],
    xp: 50,
    skillLevel: 0
  }
];

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={codeTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('LessonTree Component', () => {
  it('renders all nodes correctly', () => {
    renderWithTheme(
      <LessonTree
        nodes={mockNodes}
        onNodeClick={jest.fn()}
      />
    );

    mockNodes.forEach(node => {
      expect(screen.getByText(node.title)).toBeInTheDocument();
      expect(screen.getByText(`${node.xp} XP`)).toBeInTheDocument();
      
      const nodeElement = screen.getByTestId(`node-${node.id}`);
      expect(nodeElement).toHaveStyle({
        transform: `translate(${node.position.x}px, ${node.position.y}px)`
      });
    });
  });

  it('renders connections between nodes', () => {
    renderWithTheme(
      <LessonTree
        nodes={mockNodes}
        onNodeClick={jest.fn()}
      />
    );

    const connectionsContainer = screen.getByTestId('connections-container');
    mockNodes.forEach(node => {
      node.connections.forEach(targetId => {
        const connection = screen.getByTestId(`connection-${node.id}-${targetId}`);
        expect(connectionsContainer).toContainElement(connection);
      });
    });
  });

  it('calls onNodeClick when clicking available nodes', () => {
    const onNodeClick = jest.fn();
    renderWithTheme(
      <LessonTree
        nodes={mockNodes}
        onNodeClick={onNodeClick}
      />
    );

    const availableNode = screen.getByText('Data Types');
    fireEvent.click(availableNode);
    expect(onNodeClick).toHaveBeenCalledWith('basics_2');
  });

  it('does not call onNodeClick when clicking locked nodes', () => {
    const onNodeClick = jest.fn();
    renderWithTheme(
      <LessonTree
        nodes={mockNodes}
        onNodeClick={onNodeClick}
      />
    );

    const lockedNode = screen.getByText('Control Flow');
    fireEvent.click(lockedNode);
    expect(onNodeClick).not.toHaveBeenCalled();
  });

  it('displays skill crowns for completed nodes', () => {
    renderWithTheme(
      <LessonTree
        nodes={mockNodes}
        onNodeClick={jest.fn()}
      />
    );

    const crownElement = screen.getByTestId('crown-basics_1');
    expect(crownElement).toBeInTheDocument();
    expect(crownElement).toHaveAttribute('aria-label', 'Skill Level 3');
  });

  it('applies correct styles based on node status', () => {
    renderWithTheme(
      <LessonTree
        nodes={mockNodes}
        onNodeClick={jest.fn()}
      />
    );

    // Completed node
    const completedNode = screen.getByTestId('node-basics_1');
    expect(completedNode).toHaveStyle({
      opacity: '1',
      cursor: 'pointer'
    });

    // Locked node
    const lockedNode = screen.getByTestId('node-basics_3');
    expect(lockedNode).toHaveStyle({
      opacity: '0.5',
      cursor: 'not-allowed'
    });
  });
});
