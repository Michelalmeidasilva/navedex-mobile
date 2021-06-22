import React, { FC, useState, useEffect } from 'react';

import { ScrollView, View } from 'react-native';
import { Row, Column, Text, Button, Icon, NaversListView } from 'src/components';
import styled from 'styled-components/native';

const Home: FC = () => {
  return (
    <ScrollView pagingEnabled showsHorizontalScrollIndicator={true}>
      <Column pt='32px' pr='16px' pl='18px'>
        <Row>
          <Column flex={5}>
            <Text width='50%' fontSize='22px' lineHeight='32px' fontWeight={600}>
              Navers
            </Text>
          </Column>

          <Column flex={5}>
            <Button
              title='Adicionar Naver'
              accessibilityLabel='Clique no botão para adicionar um naver'
              variant='primary'
            ></Button>
          </Column>
        </Row>

        <NaversListView />
      </Column>
    </ScrollView>
  );
};

export default Home;
