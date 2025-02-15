import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { CodeBlock } from '../code/CodeBlock';
import { CodeMascot } from '../characters/CodeMascot';
import { useTheme } from '../../hooks/useTheme';

interface CodeElement {
  id: string;
  type: 'variable' | 'function' | 'loop' | 'condition';
  code: string;
  position: { x: number; y: number };
  connections: string[];
}

interface Props {
  challenge: {
    title: string;
    description: string;
    elements: CodeElement[];
    correctConnections: string[][];
    mascot: {
      type: 'robot' | 'computer' | 'ai';
      name: string;
    };
  };
  onComplete: (success: boolean) => void;
}

export const InteractivePlayground: React.FC<Props> = ({ challenge, onComplete }) => {
  const { colors } = useTheme();
  const [elements, setElements] = useState<CodeElement[]>(challenge.elements);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [connections, setConnections] = useState<string[][]>([]);
  const [mascotEmotion, setMascotEmotion] = useState<'thinking' | 'happy' | 'explaining'>('thinking');
  const [mascotMessage, setMascotMessage] = useState<string>('Connect the code elements to create a working program!');

  // Animation values
  const elementAnims = elements.reduce((acc, element) => {
    acc[element.id] = {
      scale: new Animated.Value(1),
      shake: new Animated.Value(0),
    };
    return acc;
  }, {} as Record<string, { scale: Animated.Value; shake: Animated.Value }>);

  const handleElementPress = (elementId: string) => {
    if (!selectedElement) {
      setSelectedElement(elementId);
      Animated.spring(elementAnims[elementId].scale, {
        toValue: 1.1,
        useNativeDriver: true,
      }).start();
    } else if (selectedElement !== elementId) {
      // Create connection
      const newConnection = [selectedElement, elementId].sort();
      if (!connections.some(conn => 
        conn[0] === newConnection[0] && conn[1] === newConnection[1]
      )) {
        setConnections([...connections, newConnection]);
        
        // Animate connection creation
        Animated.sequence([
          Animated.spring(elementAnims[selectedElement].scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.spring(elementAnims[elementId].scale, {
            toValue: 1.1,
            useNativeDriver: true,
          }),
          Animated.spring(elementAnims[elementId].scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start();
      }
      setSelectedElement(null);
    }
  };

  const checkSolution = () => {
    const isCorrect = challenge.correctConnections.every(correct =>
      connections.some(conn =>
        (conn[0] === correct[0] && conn[1] === correct[1]) ||
        (conn[0] === correct[1] && conn[1] === correct[0])
      )
    ) && connections.length === challenge.correctConnections.length;

    if (isCorrect) {
      setMascotEmotion('happy');
      setMascotMessage('Great job! You\'ve created a working program!');
      onComplete(true);
    } else {
      setMascotEmotion('explaining');
      setMascotMessage('Not quite right. Try to think about how the code elements should interact.');
      
      // Shake incorrect connections
      connections.forEach(conn => {
        if (!challenge.correctConnections.some(correct =>
          (conn[0] === correct[0] && conn[1] === correct[1]) ||
          (conn[0] === correct[1] && conn[1] === correct[0])
        )) {
          Animated.sequence([
            Animated.timing(elementAnims[conn[0]].shake, {
              toValue: 10,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(elementAnims[conn[0]].shake, {
              toValue: -10,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(elementAnims[conn[0]].shake, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start();
        }
      });
    }
  };

  const renderElement = (element: CodeElement) => {
    const isSelected = selectedElement === element.id;
    const isConnected = connections.some(conn => conn.includes(element.id));

    return (
      <Animated.View
        key={element.id}
        style={[
          styles.element,
          {
            backgroundColor: colors.surface,
            transform: [
              { scale: elementAnims[element.id].scale },
              { translateX: elementAnims[element.id].shake },
            ],
          },
          isSelected && styles.selectedElement,
          isConnected && styles.connectedElement,
        ]}
      >
        <TouchableOpacity
          onPress={() => handleElementPress(element.id)}
          style={styles.elementContent}
        >
          <CodeBlock
            code={element.code}
            language="python"
            fontSize={12}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderConnections = () => {
    return connections.map((conn, index) => {
      const start = elements.find(e => e.id === conn[0])!.position;
      const end = elements.find(e => e.id === conn[1])!.position;

      return (
        <View
          key={`connection-${index}`}
          style={[
            styles.connection,
            {
              left: start.x,
              top: start.y,
              width: Math.abs(end.x - start.x),
              height: Math.abs(end.y - start.y),
              backgroundColor: colors.primary,
            },
          ]}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        {challenge.title}
      </Text>
      <Text style={[styles.description, { color: colors.text.secondary }]}>
        {challenge.description}
      </Text>

      <View style={styles.playground}>
        {renderConnections()}
        {elements.map(renderElement)}
      </View>

      <View style={styles.mascotContainer}>
        <CodeMascot
          type={challenge.mascot.type}
          name={challenge.mascot.name}
          emotion={mascotEmotion}
          message={mascotMessage}
        />
      </View>

      <TouchableOpacity
        style={[styles.checkButton, { backgroundColor: colors.primary }]}
        onPress={checkSolution}
      >
        <Text style={[styles.checkButtonText, { color: colors.text.inverse }]}>
          Check Solution
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
  },
  playground: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    padding: 16,
  },
  element: {
    position: 'absolute',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedElement: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  connectedElement: {
    opacity: 0.8,
  },
  elementContent: {
    minWidth: 120,
  },
  connection: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#007AFF',
  },
  mascotContainer: {
    marginVertical: 24,
  },
  checkButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
