import React, { FC, useState, useEffect, useContext, createContext } from 'react';
import { AxiosResponse } from 'axios';

import { Modal, Text, Column } from 'src/components';
import { loginUser, getMe } from 'src/services';
import { API_MESSAGES } from 'src/constants';
import { getTokenStorage, setTokenStorage, clearTokenStorage } from 'src/utils';

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

      console.log('token', token);
      if (token) {
        const meUser: any = await getMe();

        if (meUser) {
          setUser(JSON.parse(meUser) as User);
        }
      }
    } catch (error) {
      console.log('error', error?.message);
    } finally {
      setIsFetchingUser(false);
    }
  };

  const login: (credentials: CredentialsParams) => Promise<void> = async credentials => {
    try {
      const { token }: any = await loginUser(credentials);
      if (token) {
        setTokenStorage(token);
        await fetchUser();
      }
    } catch (error) {
      setModalMessage(
        API_MESSAGES[error?.message as keyof typeof API_MESSAGES] || 'Erro ao se autenticar'
      );
      setDisplayModal(true);
    }
  };

  const logout = async () => {
    await clearTokenStorage();
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
