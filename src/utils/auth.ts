import AsyncStorage from '@react-native-community/async-storage';

import { ASYNC_STORAGE_TOKEN, ASYNC_STORAGE_USER } from 'src/constants';
import { User } from 'src/context';

export const getTokenStorage = (): Promise<string | null> =>
  AsyncStorage.getItem(ASYNC_STORAGE_TOKEN);

export const setTokenStorage = (token: string): Promise<void> =>
  AsyncStorage.setItem(ASYNC_STORAGE_TOKEN, token);

export const clearTokenStorage = (): Promise<void> => AsyncStorage.removeItem(ASYNC_STORAGE_TOKEN);

export const getUserStorage = (): Promise<string | null> =>
  AsyncStorage.getItem(ASYNC_STORAGE_USER);

export const setUserStorage = (user: User): Promise<void> =>
  AsyncStorage.setItem(ASYNC_STORAGE_USER, JSON.stringify(user));

export const clearUserStorage = (): Promise<void> => AsyncStorage.removeItem(ASYNC_STORAGE_TOKEN);
