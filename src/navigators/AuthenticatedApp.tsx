import React, { FC } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Home } from 'src/screens';
const Stack = createStackNavigator();

const AuthenticatedApp: FC = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  );
};

export default AuthenticatedApp;
