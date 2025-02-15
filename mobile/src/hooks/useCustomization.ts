import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { customizationApi } from '../services/api';

interface CustomizationOptions {
  mascots: any[];
  themes: any[];
  selected: {
    mascot: string;
    theme: string;
  };
}

export const useCustomization = () => {
  const { state, dispatch } = useApp();
  const [options, setOptions] = useState<CustomizationOptions>({
    mascots: [],
    themes: [],
    selected: {
      mascot: 'default',
      theme: 'default',
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOptions = async () => {
    try {
      setLoading(true);
      const response = await customizationApi.getOptions();
      setOptions(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateMascot = async (mascotId: string) => {
    try {
      const response = await customizationApi.updateMascot(mascotId);
      dispatch({
        type: 'UPDATE_USER',
        payload: { selectedMascot: mascotId }
      });
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateTheme = async (themeId: string) => {
    try {
      const response = await customizationApi.updateTheme(themeId);
      dispatch({
        type: 'UPDATE_SETTINGS',
        payload: { darkMode: themeId === 'dark' }
      });
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const usePowerUp = async (powerUpId: string) => {
    try {
      const response = await customizationApi.usePowerUp(powerUpId);
      // Update user state based on power-up type
      if (response.data.hearts) {
        dispatch({
          type: 'UPDATE_USER',
          payload: { hearts: response.data.hearts }
        });
      }
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      fetchOptions();
    }
  }, [state.isAuthenticated]);

  return {
    options,
    loading,
    error,
    updateMascot,
    updateTheme,
    usePowerUp,
    refresh: fetchOptions,
  };
};
