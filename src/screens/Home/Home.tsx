import React, { FC, useState, useEffect } from 'react';

import { ScrollView, View } from 'react-native';
import { Row, Column, Text, Button, Icon, NaverView } from 'src/components';
import styled from 'styled-components/native';

const Home: FC = () => {
  return (
    <Column pt='32px'>
      <Row pr='16px' pl='18px'>
        <Column width='50%'>
          <Text fontSize='22px' lineHeight='32px' fontWeight={600}>
            Navers
          </Text>
        </Column>

        <Column width='50%'>
          <Button
            title='Adicionar Naver'
            accessibilityLabel='Clique no botão para adicionar um naver'
            variant='primary'
          ></Button>
        </Column>
      </Row>

      <NaverView />
    </Column>
  );
};

export default Home;
