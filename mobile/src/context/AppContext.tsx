import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  gems: number;
  hearts: number;
  streak: number;
  selectedMascot: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  notifications: boolean;
  soundEffects: boolean;
  darkMode: boolean;
}

type Action =
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppState> };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  notifications: true,
  soundEffects: true,
  darkMode: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // TODO: Fetch user data from API
          // const userData = await api.getCurrentUser();
          // dispatch({ type: 'SET_USER', payload: userData });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize app' });
      }
    };

    initializeApp();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
