import React, { FC } from 'react';

import { StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import { UnauthenticatedApp, AuthenticatedApp } from 'src/navigators';
import { theme } from 'src/theme';
import { useUser, AppProvider } from 'src/context';
import { Column } from 'src/components';

if (__DEV__) {
  import('./../ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App: FC = () => {
  const { isFetchingUser, user } = useUser();

  if (isFetchingUser) {
    return (
      <Column alignItems='center' bg='gray.n100' flex={1} justifyContent='center'>
        <ActivityIndicator size='large' color={theme.colors.black} />
      </Column>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <AppProvider>
      <StatusBar backgroundColor={theme.colors.secondary} barStyle='dark-content' />

      <App />
    </AppProvider>
  </ThemeProvider>
);
