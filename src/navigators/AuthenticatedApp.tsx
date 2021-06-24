import React, { FC } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationOptions } from '@react-navigation/stack';

import { theme } from 'src/theme';
import { DrawerComponent, DrawerHeader } from 'src/components';
import { Home } from 'src/screens';

const ScreenOptions = (): StackNavigationOptions => ({
  headerTintColor: theme.colors.black,

  cardStyle: { backgroundColor: theme.colors.white },
  header: (): JSX.Element => <DrawerHeader />
});

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AuthenticatedAppStack = () => {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={ScreenOptions}>
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  );
};

const AuthenticatedApp: FC = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{ width: '80%', backgroundColor: 'background' }}
      screenOptions={{ swipeEnabled: true }}
      drawerContent={(props): JSX.Element => <DrawerComponent {...props} />}
    >
      <Drawer.Screen name='AuthenticatedAppStack' component={AuthenticatedAppStack} />
    </Drawer.Navigator>
  );
};

export default AuthenticatedApp;
