import React, { FC } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Login } from 'src/screens';

const { Navigator, Screen } = createStackNavigator();

const UnauthenticadedApp: FC = (): JSX.Element => (
  <Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
    <Screen name='Login' component={Login} />
  </Navigator>
);

export default UnauthenticadedApp;
