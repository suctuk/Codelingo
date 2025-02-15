import React, { useEffect } from 'react';
import { Animated } from 'react-native';

interface FadeInViewProps {
  children: React.ReactNode;
  style?: any;
  duration?: number;
  delay?: number;
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  style,
  duration = 500,
  delay = 0,
}) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[style, { opacity: fadeAnim }]}>
      {children}
    </Animated.View>
  );
};
