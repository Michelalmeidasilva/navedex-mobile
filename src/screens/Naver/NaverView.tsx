import React, { FC, useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, ScrollView } from 'react-native';

import { Row, Column, Text, Modal, Button, NaverCard, NaverData } from 'src/components';
import { getNavers } from 'src/services';

const NaverView: FC = () => {
  const [data, setData] = useState<NaverData[]>([]);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [isErrorFetching, setIsErrorFetching] = useState<boolean>(false);
  const [messageModal, setMessageModal] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetchingData(true);

        const navers = await getNavers();
        setData(navers);
      } catch (err) {
        setMessageModal('Erro ao carregar os navers');
        setIsErrorFetching(true);
      } finally {
        setIsFetchingData(false);
      }
    };
    fetchData();
  }, []);

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
              data={data}
              numColumns={2}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <NaverCard px='8px' mt='26px' width='50%' item={item} />}
            />
          )}
        </Column>

        <Modal isVisible={isErrorFetching} handleClose={(): void => setIsErrorFetching(false)}>
          <Column>
            <Text color='red'>{messageModal}</Text>
          </Column>
        </Modal>
      </Column>
    </ScrollView>
  );
};

export default NaverView;
