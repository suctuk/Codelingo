import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../../../shared/styles/theme';
import { useApp } from '../../../context/AppContext';

interface HeartSystemProps {
  hearts: number;
}

export const HeartSystem: React.FC<HeartSystemProps> = ({ hearts }) => {
  const { state } = useApp();
  const maxHearts = 5;

  const handleBuyHeart = () => {
    // Implement heart purchase logic
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleBuyHeart}
      disabled={hearts >= maxHearts}
    >
      <View style={styles.heartsContainer}>
        {[...Array(maxHearts)].map((_, index) => (
          <Icon
            key={index}
            name={index < hearts ? 'heart' : 'heart-outline'}
            size={20}
            color={index < hearts ? theme.colors.error : theme.colors.text.disabled}
            style={styles.heart}
          />
        ))}
      </View>
      {hearts < maxHearts && state.user.gems > 0 && (
        <View style={styles.buyContainer}>
          <Icon name="diamond-stone" size={16} color={theme.colors.secondary} />
          <Text style={styles.buyText}>5</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  heartsContainer: {
    flexDirection: 'row',
  },
  heart: {
    marginHorizontal: 2,
  },
  buyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
    paddingLeft: theme.spacing.sm,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.3)',
  },
  buyText: {
    marginLeft: 4,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
});
