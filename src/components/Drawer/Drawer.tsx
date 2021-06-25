import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { DrawerActions } from '@react-navigation/native';

import { Column, Text, Icon } from 'src/components';
import { theme } from 'src/theme';
import { useUser } from 'src/context';

const DrawerComponent: FC<any> = ({ navigation }) => {
  const { logout } = useUser();

  return (
    <Column bg={theme.colors.secondary} flex={1}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Icon icon='hamburguer' color={'black'} width={35} height={14} pl={17} pt={25} />
      </TouchableOpacity>

      <Column justifyContent='center' alignItems='center' flex={1}>
        <Column mb={60}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{ width: 198, height: 32, marginBottom: 24, alignItems: 'center' }}
          >
            <Text color='black' fontWeight={600} fontSize='22px' lineHeight='32px'>
              Navers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logout}
            style={{ width: 198, height: 32, alignItems: 'center' }}
          >
            <Text color='black' fontWeight={600} fontSize='22px' lineHeight='32px'>
              Sair
            </Text>
          </TouchableOpacity>
        </Column>
      </Column>
    </Column>
  );
};

export default DrawerComponent;
