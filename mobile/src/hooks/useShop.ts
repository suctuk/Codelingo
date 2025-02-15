import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { shopApi } from '../services/api';

export const useShop = () => {
  const { state, dispatch } = useApp();
  const [items, setItems] = useState({});
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async (category: string) => {
    try {
      setLoading(true);
      const response = await shopApi.getItems(category);
      setItems(prev => ({
        ...prev,
        [category]: response.data
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await shopApi.getUserInventory();
      setInventory(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const purchaseItem = async (itemId: string) => {
    try {
      const response = await shopApi.purchaseItem(itemId);
      // Update user's gems in global state
      dispatch({
        type: 'UPDATE_USER',
        payload: { gems: response.data.remainingGems }
      });
      await fetchInventory(); // Refresh inventory
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const hasItem = (itemId: string) => {
    return inventory.some(item => item.id === itemId);
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      fetchInventory();
    }
  }, [state.isAuthenticated]);

  return {
    items,
    inventory,
    loading,
    error,
    fetchItems,
    purchaseItem,
    hasItem,
    refresh: fetchInventory,
  };
};
