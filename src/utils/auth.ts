import AsyncStorage from '@react-native-community/async-storage';
import { User } from 'src/context';

export const getTokenStorage = (): Promise<string | null> => AsyncStorage.getItem('@token:');

export const setTokenStorage = (token: string): Promise<void> =>
  AsyncStorage.setItem('@token:', token);

export const clearTokenStorage = (): Promise<void> => AsyncStorage.removeItem('@token:');

export const getUserStorage = (): Promise<string | null> => AsyncStorage.getItem('@user:');

export const setUserStorage = (user: User): Promise<void> =>
  AsyncStorage.setItem('@user:', JSON.stringify(user));

export const clearUserStorage = (): Promise<void> => AsyncStorage.removeItem('@user:');
