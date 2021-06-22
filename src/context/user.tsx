import React, { FC, useState, useEffect, useContext, createContext } from 'react';

import { Modal, Text, Column } from 'src/components';
import { loginUser } from 'src/services';
import { API_MESSAGES } from 'src/constants';
import {
  getTokenStorage,
  setTokenStorage,
  clearTokenStorage,
  setUserStorage,
  getUserStorage,
  clearUserStorage
} from 'src/utils';

export interface User {
  email: string;
  id: string;
}

export interface UserResponse extends User {
  token: string;
}

export interface CredentialsParams {
  email: string;
  password: string;
}

type ContextProps = {
  user?: User | null;
  isFetchingUser: boolean;
  setUser?(user: User): void;
  login: (credentials: CredentialsParams) => Promise<void>;
  logout: () => void;
};

const UserContext = createContext({} as ContextProps);

const useUser: () => ContextProps = () => useContext(UserContext);

const UserProvider: FC = ({ children }) => {
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [user, setUser] = useState<User | null>();

  const fetchUser: () => Promise<void> = async () => {
    try {
      setIsFetchingUser(true);

      const token = await getTokenStorage();
      const user = await getUserStorage();

      if (token && user) {
        setUser(JSON.parse(user) as User);
      }
      console.log('user', user);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsFetchingUser(false);
    }
  };

  const login: (credentials: CredentialsParams) => Promise<void> = async credentials => {
    try {
      console.log(credentials);

      const { token, id, email }: any = await loginUser(credentials);

      if (token) {
        setTokenStorage(token);
        setUserStorage({
          id,
          email
        });
        await fetchUser();
      }
    } catch (error) {
      console.log('error', error);
      setModalMessage(
        API_MESSAGES[error?.message as keyof typeof API_MESSAGES] || 'Erro ao se autenticar'
      );

      setDisplayModal(true);
    }
  };

  const logout = async () => {
    await clearTokenStorage();
    await clearUserStorage();
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          setUser,
          isFetchingUser,
          login,
          logout
        }}
      >
        {children}
      </UserContext.Provider>

      <Modal isVisible={displayModal} handleClose={(): void => setDisplayModal(false)}>
        <Column>
          <Text color='black'>{modalMessage}</Text>
        </Column>
      </Modal>
    </>
  );
};

export { UserProvider, useUser };
