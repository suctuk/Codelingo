import React, { useEffect } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

interface ScaleViewProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
  activeScale?: number;
  duration?: number;
}

export const ScaleView: React.FC<ScaleViewProps> = ({
  children,
  style,
  onPress,
  activeScale = 0.95,
  duration = 100,
}) => {
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: activeScale,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
