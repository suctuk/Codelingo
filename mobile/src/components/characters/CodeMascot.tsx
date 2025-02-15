import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface CodeMascotProps {
  type: 'robot' | 'computer' | 'ai';
  name: string;
  message?: string;
  emotion?: 'happy' | 'thinking' | 'celebrating' | 'explaining' | 'confused' | 'excited' | 'sleeping';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const MASCOT_IMAGES = {
  robot: {
    happy: require('../../assets/characters/robot-happy.png'),
    thinking: require('../../assets/characters/robot-thinking.png'),
    celebrating: require('../../assets/characters/robot-celebrating.png'),
    explaining: require('../../assets/characters/robot-explaining.png'),
    confused: require('../../assets/characters/robot-confused.png'),
    excited: require('../../assets/characters/robot-excited.png'),
    sleeping: require('../../assets/characters/robot-sleeping.png'),
  },
  computer: {
    happy: require('../../assets/characters/computer-happy.png'),
    thinking: require('../../assets/characters/computer-thinking.png'),
    celebrating: require('../../assets/characters/computer-celebrating.png'),
    explaining: require('../../assets/characters/computer-explaining.png'),
    confused: require('../../assets/characters/computer-confused.png'),
    excited: require('../../assets/characters/computer-excited.png'),
    sleeping: require('../../assets/characters/computer-sleeping.png'),
  },
  ai: {
    happy: require('../../assets/characters/ai-happy.png'),
    thinking: require('../../assets/characters/ai-thinking.png'),
    celebrating: require('../../assets/characters/ai-celebrating.png'),
    explaining: require('../../assets/characters/ai-explaining.png'),
    confused: require('../../assets/characters/ai-confused.png'),
    excited: require('../../assets/characters/ai-excited.png'),
    sleeping: require('../../assets/characters/ai-sleeping.png'),
  },
};

const MASCOT_SIZES = {
  small: 60,
  medium: 100,
  large: 160,
};

const EMOTION_ANIMATIONS = {
  happy: (anim: Animated.Value) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1.1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  },
  thinking: (anim: Animated.Value) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: -0.1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sine),
        }),
        Animated.timing(anim, {
          toValue: 0.1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sine),
        }),
      ])
    ).start();
  },
  celebrating: (anim: Animated.Value) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: -1,
          duration: 150,
          useNativeDriver: true,
        }),
      ])
    ).start();
  },
  explaining: (anim: Animated.Value) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 0.05,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: -0.05,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  },
  confused: (anim: Animated.Value) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: -0.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  },
  excited: (anim: Animated.Value) => {
    Animated.loop(
      Animated.sequence([
        Animated.spring(anim, {
          toValue: 1.2,
          useNativeDriver: true,
          damping: 2,
        }),
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 2,
        }),
      ])
    ).start();
  },
  sleeping: (anim: Animated.Value) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 0.1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sine),
        }),
        Animated.timing(anim, {
          toValue: -0.1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sine),
        }),
      ])
    ).start();
  },
};

export const CodeMascot: React.FC<CodeMascotProps> = ({
  type,
  name,
  message,
  emotion = 'happy',
  size = 'medium',
  style,
}) => {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const messageAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset animations
    scaleAnim.setValue(1);
    rotateAnim.setValue(0);

    // Start emotion-specific animation
    const animationFn = EMOTION_ANIMATIONS[emotion];
    if (animationFn) {
      if (emotion === 'celebrating' || emotion === 'confused') {
        animationFn(rotateAnim);
      } else if (emotion === 'excited') {
        animationFn(scaleAnim);
      } else {
        animationFn(rotateAnim);
      }
    }

    // Animate message appearance
    if (message) {
      Animated.sequence([
        Animated.timing(messageAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(messageAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [emotion, message]);

  const mascotStyle = {
    transform: [
      { scale: scaleAnim },
      {
        rotate: rotateAnim.interpolate({
          inputRange: [-1, 1],
          outputRange: ['-20deg', '20deg'],
        }),
      },
    ],
  };

  const messageStyle = {
    opacity: messageAnim,
    transform: [
      {
        translateY: messageAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
    ],
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.imageContainer, mascotStyle]}>
        <Image
          source={MASCOT_IMAGES[type][emotion]}
          style={[
            styles.image,
            {
              width: MASCOT_SIZES[size],
              height: MASCOT_SIZES[size],
            },
          ]}
        />
      </Animated.View>
      <Text style={[styles.name, { color: colors.text.primary }]}>{name}</Text>
      {message && (
        <Animated.View
          style={[
            styles.messageContainer,
            { backgroundColor: colors.surface },
            messageStyle,
          ]}
        >
          <View style={[styles.messageTail, { borderTopColor: colors.surface }]} />
          <Text style={[styles.message, { color: colors.text.primary }]}>
            {message}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 8,
  },
  image: {
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 12,
    maxWidth: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageTail: {
    position: 'absolute',
    top: -10,
    left: '50%',
    marginLeft: -10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
