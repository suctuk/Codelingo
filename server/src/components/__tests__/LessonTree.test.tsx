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
      const nodeElement = screen.getByTestId(`node-${node.id}`);
      
      // Check title and XP
      expect(screen.getByTestId(`title-${node.id}`)).toHaveTextContent(node.title);
      expect(screen.getByTestId(`xp-${node.id}`)).toHaveTextContent(`${node.xp} XP`);
      
      // Check position
      expect(nodeElement).toHaveStyle({
        left: `${node.position.x}px`,
        top: `${node.position.y}px`
      });

      // Check accessibility attributes
      expect(nodeElement).toHaveAttribute(
        'aria-label',
        `${node.title} - ${node.status} - ${node.xp} XP`
      );
      
      if (node.status === 'locked') {
        expect(nodeElement).toHaveAttribute('aria-disabled', 'true');
        expect(nodeElement).toHaveAttribute('tabIndex', '-1');
      } else {
        expect(nodeElement).toHaveAttribute('aria-disabled', 'false');
        expect(nodeElement).toHaveAttribute('tabIndex', '0');
      }
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

    const availableNode = screen.getByTestId('node-basics_2');
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

    const lockedNode = screen.getByTestId('node-basics_3');
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

    // Check crown for completed node with skill level
    const crownElement = screen.getByTestId('crown-basics_1');
    expect(crownElement).toBeInTheDocument();
    expect(crownElement).toHaveAttribute('aria-label', 'Skill Level 3');
    
    // Verify no crown for nodes without skill level
    expect(screen.queryByTestId('crown-basics_2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('crown-basics_3')).not.toBeInTheDocument();
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
      cursor: 'pointer'
    });

    // Available node
    const availableNode = screen.getByTestId('node-basics_2');
    expect(availableNode).toHaveStyle({
      cursor: 'pointer'
    });

    // Locked node
    const lockedNode = screen.getByTestId('node-basics_3');
    expect(lockedNode).toHaveStyle({
      cursor: 'not-allowed'
    });
  });
});
