import React, { FC, useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNaver } from 'src/context';
import { Row, Column, Text, Modal, Button, NaverCard, NaverData } from 'src/components';

const NaverView: FC = () => {
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [isErrorFetching, setIsErrorFetching] = useState<boolean>(false);
  const [messageErrorModal, setMessageErrorModal] = useState<string>('');
  const [titleModalError, setTitleModalError] = useState<string>('');
  const navigation = useNavigation();
  const { navers } = useNaver();

  return (
    <ScrollView>
      <Column pt='32px'>
        <Row pr='16px' pl='18px'>
          <Column width='50%'>
            <Text fontSize='22px' lineHeight='32px' fontWeight={600}>
              Navers
            </Text>
          </Column>

          <Column width='50%' pl='6px'>
            <Button
              title='Adicionar Naver'
              accessibilityLabel='Clique no botão para adicionar um naver'
              variant='primary'
              onPress={() => navigation.push('NaverAdd')}
            ></Button>
          </Column>
        </Row>

        <Column my='12px' mx='8px'>
          {isFetchingData ? (
            <Column mt='150px' justifyContent='center' alignItems='center'>
              <ActivityIndicator size='large' color='#0000ff' />

              <Text mt='10px'>Carregando os navers ...</Text>
            </Column>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              initialNumToRender={4}
              data={navers}
              numColumns={2}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <NaverCard px='8px' mt='26px' width='50%' item={item} />}
            />
          )}
        </Column>

        <Modal
          title={titleModalError}
          isVisible={isErrorFetching}
          handleClose={(): void => setIsErrorFetching(false)}
        >
          <Column>
            <Text color='red'>{messageErrorModal}</Text>
          </Column>
        </Modal>
      </Column>
    </ScrollView>
  );
};

export default NaverView;
