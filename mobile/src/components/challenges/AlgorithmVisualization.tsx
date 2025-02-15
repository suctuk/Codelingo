import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { CodeBlock } from '../code/CodeBlock';
import { CodeMascot } from '../characters/CodeMascot';
import { useTheme } from '../../hooks/useTheme';

interface ArrayElement {
  value: number;
  id: string;
  isComparing: boolean;
  isSorted: boolean;
}

interface Props {
  challenge: {
    title: string;
    description: string;
    algorithm: 'bubble' | 'selection' | 'insertion' | 'quick' | 'merge';
    initialArray: number[];
    code: string;
    mascot: {
      type: 'robot' | 'computer' | 'ai';
      name: string;
    };
  };
  onComplete: (success: boolean) => void;
}

export const AlgorithmVisualization: React.FC<Props> = ({ challenge, onComplete }) => {
  const { colors } = useTheme();
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [mascotEmotion, setMascotEmotion] = useState<'thinking' | 'happy' | 'explaining'>('explaining');
  const [mascotMessage, setMascotMessage] = useState<string>('Let\'s visualize this algorithm!');
  
  const elementAnimations = useRef<{ [key: string]: Animated.Value }>({}).current;
  const screenWidth = Dimensions.get('window').width;
  const barWidth = (screenWidth - 64) / challenge.initialArray.length;

  useEffect(() => {
    // Initialize array with animation values
    const initialArray = challenge.initialArray.map((value, index) => ({
      value,
      id: `element-${index}`,
      isComparing: false,
      isSorted: false,
    }));
    setArray(initialArray);

    // Initialize animations
    initialArray.forEach(element => {
      elementAnimations[element.id] = new Animated.Value(0);
    });
  }, [challenge.initialArray]);

  const animateSwap = (element1: ArrayElement, element2: ArrayElement) => {
    const duration = 500;
    return new Promise<void>(resolve => {
      Animated.parallel([
        Animated.timing(elementAnimations[element1.id], {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(elementAnimations[element2.id], {
          toValue: -1,
          duration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Reset animation values
        elementAnimations[element1.id].setValue(0);
        elementAnimations[element2.id].setValue(0);
        resolve();
      });
    });
  };

  const bubbleSort = async () => {
    const arr = [...array];
    let hasSwapped;
    
    do {
      hasSwapped = false;
      for (let i = 0; i < arr.length - 1; i++) {
        arr[i].isComparing = true;
        arr[i + 1].isComparing = true;
        setArray([...arr]);
        setMascotMessage(`Comparing ${arr[i].value} and ${arr[i + 1].value}`);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (arr[i].value > arr[i + 1].value) {
          setMascotMessage(`Swapping ${arr[i].value} and ${arr[i + 1].value}`);
          await animateSwap(arr[i], arr[i + 1]);
          
          const temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          hasSwapped = true;
        }
        
        arr[i].isComparing = false;
        arr[i + 1].isComparing = false;
        setArray([...arr]);
      }
      
      arr[arr.length - 1].isSorted = true;
      setArray([...arr]);
    } while (hasSwapped);

    arr.forEach(element => element.isSorted = true);
    setArray([...arr]);
    setMascotEmotion('happy');
    setMascotMessage('Array sorted successfully!');
    onComplete(true);
  };

  const selectionSort = async () => {
    const arr = [...array];
    
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      arr[i].isComparing = true;
      setArray([...arr]);
      setMascotMessage(`Finding minimum element from position ${i}`);
      
      for (let j = i + 1; j < arr.length; j++) {
        arr[j].isComparing = true;
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (arr[j].value < arr[minIdx].value) {
          arr[minIdx].isComparing = false;
          minIdx = j;
        } else {
          arr[j].isComparing = false;
        }
        setArray([...arr]);
      }
      
      if (minIdx !== i) {
        setMascotMessage(`Swapping ${arr[i].value} with minimum ${arr[minIdx].value}`);
        await animateSwap(arr[i], arr[minIdx]);
        
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
      }
      
      arr[i].isComparing = false;
      arr[i].isSorted = true;
      setArray([...arr]);
    }
    
    arr[arr.length - 1].isSorted = true;
    setArray([...arr]);
    setMascotEmotion('happy');
    setMascotMessage('Selection sort completed!');
    onComplete(true);
  };

  const quickSort = async () => {
    const arr = [...array];
    
    const partition = async (low: number, high: number) => {
      const pivot = arr[high];
      pivot.isComparing = true;
      setArray([...arr]);
      setMascotMessage(`Using ${pivot.value} as pivot`);
      
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        arr[j].isComparing = true;
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (arr[j].value < pivot.value) {
          i++;
          if (i !== j) {
            setMascotMessage(`Swapping ${arr[i].value} with ${arr[j].value}`);
            await animateSwap(arr[i], arr[j]);
            
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
          }
        }
        
        arr[j].isComparing = false;
        setArray([...arr]);
      }
      
      if (i + 1 !== high) {
        setMascotMessage(`Moving pivot ${pivot.value} to its final position`);
        await animateSwap(arr[i + 1], arr[high]);
        
        const temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
      }
      
      pivot.isComparing = false;
      pivot.isSorted = true;
      setArray([...arr]);
      
      return i + 1;
    };
    
    const sort = async (low: number, high: number) => {
      if (low < high) {
        const pi = await partition(low, high);
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      }
    };
    
    await sort(0, arr.length - 1);
    arr.forEach(element => element.isSorted = true);
    setArray([...arr]);
    setMascotEmotion('happy');
    setMascotMessage('Quick sort completed!');
    onComplete(true);
  };

  const mergeSort = async () => {
    const arr = [...array];
    
    const merge = async (left: number, middle: number, right: number) => {
      const n1 = middle - left + 1;
      const n2 = right - middle;
      
      const L = arr.slice(left, middle + 1);
      const R = arr.slice(middle + 1, right + 1);
      
      let i = 0, j = 0, k = left;
      
      while (i < n1 && j < n2) {
        L[i].isComparing = true;
        R[j].isComparing = true;
        setArray([...arr]);
        setMascotMessage(`Comparing ${L[i].value} and ${R[j].value}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (L[i].value <= R[j].value) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        
        arr[k].isComparing = false;
        arr[k].isSorted = true;
        k++;
        setArray([...arr]);
      }
      
      while (i < n1) {
        arr[k] = L[i];
        arr[k].isSorted = true;
        i++;
        k++;
        setArray([...arr]);
      }
      
      while (j < n2) {
        arr[k] = R[j];
        arr[k].isSorted = true;
        j++;
        k++;
        setArray([...arr]);
      }
    };
    
    const sort = async (left: number, right: number) => {
      if (left < right) {
        const middle = Math.floor((left + right) / 2);
        setMascotMessage(`Dividing array at position ${middle}`);
        await sort(left, middle);
        await sort(middle + 1, right);
        await merge(left, middle, right);
      }
    };
    
    await sort(0, arr.length - 1);
    setMascotEmotion('happy');
    setMascotMessage('Merge sort completed!');
    onComplete(true);
  };

  const startVisualization = () => {
    setIsPlaying(true);
    setMascotEmotion('thinking');
    
    switch (challenge.algorithm) {
      case 'bubble':
        bubbleSort();
        break;
      case 'selection':
        selectionSort();
        break;
      case 'quick':
        quickSort();
        break;
      case 'merge':
        mergeSort();
        break;
    }
  };

  const resetVisualization = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setMascotEmotion('explaining');
    setMascotMessage('Let\'s try again!');
    
    // Reset array
    const initialArray = challenge.initialArray.map((value, index) => ({
      value,
      id: `element-${index}`,
      isComparing: false,
      isSorted: false,
    }));
    setArray(initialArray);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        {challenge.title}
      </Text>
      <Text style={[styles.description, { color: colors.text.secondary }]}>
        {challenge.description}
      </Text>

      <View style={styles.visualizationContainer}>
        {array.map((element, index) => (
          <Animated.View
            key={element.id}
            style={[
              styles.bar,
              {
                backgroundColor: element.isComparing
                  ? colors.warning
                  : element.isSorted
                  ? colors.success
                  : colors.primary,
                height: (element.value / Math.max(...challenge.initialArray)) * 200,
                width: barWidth - 4,
                transform: [
                  {
                    translateX: elementAnimations[element.id].interpolate({
                      inputRange: [-1, 0, 1],
                      outputRange: [-barWidth, 0, barWidth],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.codeContainer}>
        <CodeBlock
          code={challenge.code}
          language="javascript"
          fontSize={12}
        />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isPlaying ? colors.error : colors.primary },
          ]}
          onPress={isPlaying ? resetVisualization : startVisualization}
        >
          <Text style={[styles.buttonText, { color: colors.text.inverse }]}>
            {isPlaying ? 'Reset' : 'Start'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mascotContainer}>
        <CodeMascot
          type={challenge.mascot.type}
          name={challenge.mascot.name}
          emotion={mascotEmotion}
          message={mascotMessage}
        />
      </View>
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
  visualizationContainer: {
    height: 240,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  bar: {
    marginHorizontal: 2,
    borderRadius: 4,
  },
  codeContainer: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    marginBottom: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  mascotContainer: {
    alignItems: 'center',
  },
});
