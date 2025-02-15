import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { theme } from '../../../shared/styles/theme';

interface MascotProps {
  type: 'robot' | 'computer';
  mood: 'happy' | 'sad' | 'excited' | 'thinking';
  size?: 'small' | 'medium' | 'large';
  animate?: boolean;
}

export const Mascot: React.FC<MascotProps> = ({
  type,
  mood,
  size = 'medium',
  animate = true,
}) => {
  const bounceAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    if (animate) {
      const bounce = Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]);

      const scale = Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]);

      Animated.loop(
        Animated.parallel([bounce, scale]),
        { iterations: -1 }
      ).start();
    }
  }, [animate]);

  const getMascotSize = () => {
    switch (size) {
      case 'small':
        return 60;
      case 'large':
        return 120;
      default:
        return 80;
    }
  };

  const mascotSize = getMascotSize();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: mascotSize,
          height: mascotSize,
          transform: [
            { translateY: bounceAnim },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <Image
        source={theme.mascots[type][mood]}
        style={[
          styles.image,
          { width: mascotSize, height: mascotSize },
        ]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
