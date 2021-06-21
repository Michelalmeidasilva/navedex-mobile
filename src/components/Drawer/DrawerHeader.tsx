import React, { FC } from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';

import { Icon, RowProps, Row } from 'src/components';
import { theme } from 'src/theme';
import { IMAGES_URL } from 'src/constants';

const DrawerHeader: FC = () => {
  const navigation = useNavigation();
  const { colors } = theme;

  return (
    <RowContainer bg={colors.secondary}>
      <Row flex={3}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Icon icon='hamburguer' color={colors.black} width={35} height={14} pl={17} pt={25} />
        </TouchableOpacity>
      </Row>

      <Row flex={7}>
        <Image style={{ width: 156, height: 40, alignSelf: 'center' }} source={IMAGES_URL.logo} />
      </Row>
    </RowContainer>
  );
};

const RowContainer: FC<RowProps> = styled(Row)`
  height: 64px;
  box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.25);
`;

export default DrawerHeader;
