import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Svg, Path, Circle, G } from 'react-native-svg';

interface InteractiveAnimationProps {
  type: string;
  content: string;
  style?: ViewStyle;
}

export const InteractiveAnimation: React.FC<InteractiveAnimationProps> = ({
  type,
  content,
  style,
}) => {
  const { colors } = useTheme();
  const [animationState, setAnimationState] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [boxAnim] = useState(new Animated.Value(0));
  const [textAnim] = useState(new Animated.Value(0));
  const [loopAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isPlaying) {
      switch (type) {
        case 'box-storing-item-animation':
          playStorageAnimation();
          break;
        case 'loop-stirring-animation':
          playLoopAnimation();
          break;
        case 'weather-decision-interactive':
          playDecisionAnimation();
          break;
      }
    }
  }, [isPlaying]);

  const playStorageAnimation = () => {
    Animated.sequence([
      // Move box in
      Animated.timing(boxAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Show text
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Pause
      Animated.delay(1000),
      // Reset
      Animated.parallel([
        Animated.timing(boxAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      if (isPlaying) {
        playStorageAnimation();
      }
    });
  };

  const playLoopAnimation = () => {
    Animated.sequence([
      Animated.timing(loopAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(loopAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (isPlaying) {
        playLoopAnimation();
      }
    });
  };

  const playDecisionAnimation = () => {
    // Implement decision tree animation
  };

  const renderStorageAnimation = () => (
    <View style={styles.animationContainer}>
      <Animated.View
        style={[
          styles.box,
          {
            backgroundColor: colors.primary,
            transform: [
              {
                translateX: boxAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.boxLabel,
            {
              opacity: textAnim,
            },
          ]}
        >
          Variable
        </Animated.Text>
      </Animated.View>
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: colors.primary }]}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Text style={styles.controlButtonText}>
            {isPlaying ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            setIsPlaying(false);
            boxAnim.setValue(0);
            textAnim.setValue(0);
          }}
        >
          <Text style={styles.controlButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLoopAnimation = () => (
    <View style={styles.animationContainer}>
      <Svg height="200" width="200" viewBox="0 0 100 100">
        <Animated.View
          style={{
            transform: [
              {
                rotate: loopAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}
        >
          <G>
            <Circle
              cx="50"
              cy="50"
              r="40"
              stroke={colors.primary}
              strokeWidth="2"
              fill="none"
            />
            <Path
              d="M50 10 L50 90 M10 50 L90 50"
              stroke={colors.primary}
              strokeWidth="2"
            />
          </G>
        </Animated.View>
      </Svg>
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: colors.primary }]}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Text style={styles.controlButtonText}>
            {isPlaying ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDecisionAnimation = () => (
    <View style={styles.animationContainer}>
      <TouchableOpacity
        style={[styles.weatherButton, { backgroundColor: colors.primary }]}
        onPress={() => setAnimationState(animationState === 0 ? 1 : 0)}
      >
        <Text style={styles.weatherButtonText}>
          {animationState === 0 ? '☀️ Make it Rain' : '🌧️ Make it Sunny'}
        </Text>
      </TouchableOpacity>
      <View style={styles.decisionTree}>
        <View style={styles.condition}>
          <Text style={[styles.conditionText, { color: colors.text.primary }]}>
            Is it raining?
          </Text>
        </View>
        <View style={styles.branches}>
          <View style={styles.branch}>
            <Text style={[styles.branchText, { color: colors.text.secondary }]}>
              Yes
            </Text>
            <View
              style={[
                styles.action,
                {
                  backgroundColor:
                    animationState === 1 ? colors.primary : 'transparent',
                },
              ]}
            >
              <Text style={styles.actionText}>Take Umbrella</Text>
            </View>
          </View>
          <View style={styles.branch}>
            <Text style={[styles.branchText, { color: colors.text.secondary }]}>
              No
            </Text>
            <View
              style={[
                styles.action,
                {
                  backgroundColor:
                    animationState === 0 ? colors.primary : 'transparent',
                },
              ]}
            >
              <Text style={styles.actionText}>Leave Umbrella</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderAnimation = () => {
    switch (type) {
      case 'box-storing-item-animation':
        return renderStorageAnimation();
      case 'loop-stirring-animation':
        return renderLoopAnimation();
      case 'weather-decision-interactive':
        return renderDecisionAnimation();
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, style]}>
      {renderAnimation()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 16,
  },
  controlButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  weatherButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  weatherButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  decisionTree: {
    alignItems: 'center',
  },
  condition: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  conditionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  branches: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  branch: {
    alignItems: 'center',
  },
  branchText: {
    fontSize: 14,
    marginBottom: 8,
  },
  action: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
  },
});
