import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useShop } from '../hooks/useShop';
import { useApp } from '../context/AppContext';

const ShopScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('power-ups');
  const { items, loading, error, fetchItems, purchaseItem, hasItem } = useShop();
  const { state } = useApp();

  useEffect(() => {
    fetchItems(selectedCategory);
  }, [selectedCategory]);

  const handlePurchase = async (item: any) => {
    if (state.user && state.user.gems >= item.price) {
      try {
        await purchaseItem(item.id);
        Alert.alert('Success', `You have purchased ${item.name}!`);
      } catch (err) {
        Alert.alert('Error', err.message);
      }
    } else {
      Alert.alert('Insufficient Gems', 'You need more gems to make this purchase.');
    }
  };

  if (loading && !items[selectedCategory]) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#58CC02" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle" size={48} color="#FF4B4B" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const categories = [
    { id: 'power-ups', label: 'Power-ups', icon: 'flash' },
    { id: 'mascots', label: 'Mascots', icon: 'robot' },
    { id: 'themes', label: 'Themes', icon: 'palette' },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Gems */}
      <LinearGradient
        colors={['#58CC02', '#4CAF50']}
        style={styles.header}
      >
        <View style={styles.gemsContainer}>
          <Icon name="diamond-stone" size={24} color="#FFD700" />
          <Text style={styles.gemsText}>{state.user.gems}</Text>
        </View>
        <TouchableOpacity style={styles.getGemsButton}>
          <Text style={styles.getGemsText}>Get More Gems</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Categories */}
      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Icon
              name={category.icon}
              size={20}
              color={selectedCategory === category.id ? '#58CC02' : '#666'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Shop Items */}
      <ScrollView style={styles.itemsContainer}>
        {items[selectedCategory].map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <View
                style={[styles.itemIcon, { backgroundColor: item.color + '20' }]}
              >
                {item.icon.length === 2 ? (
                  <Text style={styles.emojiIcon}>{item.icon}</Text>
                ) : (
                  <Icon name={item.icon} size={24} color={item.color} />
                )}
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.purchaseButton}
              onPress={() => handlePurchase(item)}
            >
              <Icon name="diamond-stone" size={16} color="#FFD700" />
              <Text style={styles.priceText}>{item.price}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  gemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  gemsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  getGemsButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  getGemsText: {
    color: '#58CC02',
    fontWeight: '600',
  },
  categories: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#f5f5f5',
  },
  selectedCategory: {
    backgroundColor: '#e8f5e9',
  },
  categoryText: {
    marginLeft: 8,
    color: '#666',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#58CC02',
  },
  itemsContainer: {
    flex: 1,
    padding: 16,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emojiIcon: {
    fontSize: 24,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
  },
  purchaseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priceText: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  errorText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ShopScreen;
