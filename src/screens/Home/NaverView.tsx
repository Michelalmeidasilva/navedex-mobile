import React, { FC, useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import { Row, Column, Text, Icon, RowProps, Modal, Button } from 'src/components';
import { getNavers, NaverData } from 'src/services';

const NaverView: FC<RowProps> = ({ ...props }) => {
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
    console.log(data.length);
  }, []);

  const renderNaver = ({ item }) => {
    const { id, name, job_role: jobRole, url } = item;

    return (
      <Column key={id} px='8px' mt='26px' width='50%'>
        <Image source={{ uri: url }} />

        <Column>
          <Text variant='small' lineHeight='20px' mt='8px' fontWeight={700}>
            {name}
          </Text>

          <Text variant='small' mt='4px'>
            {jobRole.length > 23 ? jobRole.substr(0, 23).concat('...') : jobRole}
          </Text>
        </Column>

        <Row mt='10px'>
          <Icon ml='5px' icon='trash' color='black' width={14} height={18}></Icon>

          <Icon ml='24px' icon='edit' color='black' width={18.41} height={18.41}></Icon>
        </Row>
      </Column>
    );
  };

  return (
    <Column {...props}>
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
            renderItem={renderNaver}
          />
        )}
      </Column>

      <Modal isVisible={isErrorFetching} handleClose={(): void => setIsErrorFetching(false)}>
        <Column>
          <Text color='red'>{messageModal}</Text>
        </Column>
      </Modal>
    </Column>
  );
};

const Image = styled.Image`
  height: 180px;
`;

export default NaverView;
