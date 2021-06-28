import React, { FC } from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';

import { Icon, Row } from 'src/components';
import { theme } from 'src/theme';
import { IMAGES_URL } from 'src/constants';
const { colors } = theme;

const DrawerHeader: FC = () => {
  const navigation = useNavigation();

  return (
    <Container backgroundColor={colors.background}>
      {navigation.canGoBack() ? (
        <Row flex={3}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Icon icon='arrow-back' color='black' width={30} height={16} pl={17} pt={25} />
          </TouchableOpacity>
        </Row>
      ) : (
        <Row flex={3}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon icon='hamburguer' color={colors.black} width={35} height={14} pl={17} pt={25} />
          </TouchableOpacity>
        </Row>
      )}
      <Row flex={7}>
        <Image style={{ width: 156, height: 40, alignSelf: 'center' }} source={IMAGES_URL.logo} />
      </Row>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${props => props.backgroundColor};
  elevation: 7;
  height: 64px;
  flex-direction: row;
`;
export default DrawerHeader;
