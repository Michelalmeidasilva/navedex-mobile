import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { Column, Text } from 'src/components';
import { theme } from 'src/theme';
import { useUser } from 'src/context';

const DrawerComponent: FC<any> = ({ navigation }) => {
  const { logout } = useUser();

  return (
    <Column justifyContent='center' alignItems='center' bg={theme.colors.secondary} flex={1}>
      <Column mb={60}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{ width: 198, height: 32, marginBottom: 24, alignItems: 'center' }}
        >
          <Text color='black' fontWeight={600} fontSize='22px' lineHeight='32px'>
            Navers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={logout} style={{ width: 198, height: 32, alignItems: 'center' }}>
          <Text color='black' fontWeight={600} fontSize='22px' lineHeight='32px'>
            Sair
          </Text>
        </TouchableOpacity>
      </Column>
    </Column>
  );
};

export default DrawerComponent;
