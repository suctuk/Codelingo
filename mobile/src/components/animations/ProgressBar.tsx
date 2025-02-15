import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface ProgressBarProps {
  progress: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  duration?: number;
  style?: any;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  width = '100%',
  height = 8,
  backgroundColor = '#E0E0E0',
  fillColor = '#58CC02',
  duration = 500,
  style,
}) => {
  const progressAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={[
        styles.container,
        { width, height, backgroundColor },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          {
            width: widthInterpolated,
            backgroundColor: fillColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
