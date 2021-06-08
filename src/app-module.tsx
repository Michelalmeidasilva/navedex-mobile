import React, { FC } from 'react';

import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import UnauthenticadedApp from 'src/navigators/UnauthenticadedApp';
import { theme } from 'src/theme';

const App: FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <UnauthenticadedApp />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <StatusBar backgroundColor={theme.colors.secondary} barStyle='dark-content' />

    <App />
  </ThemeProvider>
);
