import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface Props<T> {
  items: T[];
  renderItem: (item: T, isDragging: boolean) => React.ReactNode;
  onReorder: (newIndices: number[]) => void;
}

export default function DraggableList<T>({ items, renderItem, onReorder }: Props<T>) {
  const [orderIndices, setOrderIndices] = useState(items.map((_, i) => i));
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [draggingY, setDraggingY] = useState(0);
  const itemHeight = 60; // Adjust based on your item height

  const pan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        const index = Math.floor(gestureState.y0 / itemHeight);
        if (index >= 0 && index < items.length) {
          setDraggingIndex(index);
          setDraggingY(gestureState.y0);
          pan.setOffset({
            x: 0,
            y: gestureState.y0,
          });
        }
      },
      onPanResponderMove: (_, gestureState) => {
        if (draggingIndex !== null) {
          pan.setValue({
            x: 0,
            y: gestureState.dy,
          });

          const newPosition = Math.floor((gestureState.moveY) / itemHeight);
          if (
            newPosition !== draggingIndex &&
            newPosition >= 0 &&
            newPosition < items.length
          ) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            const newIndices = [...orderIndices];
            const dragged = newIndices[draggingIndex];
            newIndices.splice(draggingIndex, 1);
            newIndices.splice(newPosition, 0, dragged);
            setOrderIndices(newIndices);
            setDraggingIndex(newPosition);
          }
        }
      },
      onPanResponderRelease: () => {
        if (draggingIndex !== null) {
          pan.flattenOffset();
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
          onReorder(orderIndices);
          setDraggingIndex(null);
        }
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {orderIndices.map((itemIndex, visualIndex) => {
        const isDragging = visualIndex === draggingIndex;
        const itemStyle = {
          zIndex: isDragging ? 1 : 0,
          transform: isDragging
            ? [{ translateY: pan.y }]
            : [],
        };

        return (
          <Animated.View key={itemIndex} style={[styles.itemContainer, itemStyle]}>
            {renderItem(items[itemIndex], isDragging)}
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    width: '100%',
  },
});
