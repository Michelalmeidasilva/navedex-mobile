import AsyncStorage from '@react-native-community/async-storage';

export const getTokenStorage = (): Promise<string | null> => AsyncStorage.getItem('@token:');

export const setTokenStorage = (token: string): Promise<void> =>
  AsyncStorage.setItem('@token:', token);

export const clearTokenStorage = (): Promise<void> => AsyncStorage.removeItem('@token:');
