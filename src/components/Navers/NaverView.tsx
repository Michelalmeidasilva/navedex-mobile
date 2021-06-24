import React, { FC, useState, useEffect } from 'react';
<<<<<<< HEAD:src/components/Navers/NaverView.tsx

import { ScrollView, View, FlatList } from 'react-native';
import { Row, Column, Text, Button, Icon } from 'src/components';
=======
import { FlatList, ActivityIndicator } from 'react-native';
>>>>>>> 524e563 (chore(service-navers): added service for navers):src/components/Navers/NaversList.tsx
import styled from 'styled-components/native';

import { Row, Column, Text, Icon, RowProps, Modal } from 'src/components';
import { getNavers } from 'src/services';
interface NaverData {
  id: any;
  name: string;
  admissionDate: string;
  job_role: string;
  user_id: string;
  project: string;
  birthdate: string;
  url: string;
}

<<<<<<< HEAD:src/components/Navers/NaverView.tsx
const NaversListView = () => {
  const [data, setData] = useState<NaverData[]>([
    {
      id: 3,

      jobRole: 'Business Development Executive',
      admissionDate: '19/08/2018',
      birthdate: '12/04/1992',
      project: 'Comercial',
      name: 'João Pedro Bretanha',
      url: 'https://nave.rs/static/aed895040a9baf308fb4f9e755972062/2a4de/joao-naver.png'
    },
    {
      id: 2,

      jobRole: 'Technology Coordinator',
      admissionDate: '19/08/2019',
      birthdate: '12/04/1992',
      project: 'NAVE TD',
      name: 'Gabriel do Couto Santos',
      url: 'https://nave.rs/static/e6372d1d5b14756e2e2a382bacca41b7/2a4de/couto-naver.png'
    },
    {
      id: 1,
      jobRole: 'Technology Coordinator',
      admissionDate: '19/08/2019',
      birthdate: '12/04/1992',
      project: 'NAVE TD',
      name: 'Felipe Adamoli',
      url: 'https://nave.rs/static/9ee43e0847b6dc5a48b0bbe3dcf4797c/2a4de/adamoli-naver.png'
    },
    {
      id: 4,
      jobRole: 'Marketing Coordinator',
      admissionDate: '19/08/2019',
      birthdate: '12/04/1995',
      project: 'NAVE MARKETING',
      name: 'Victória Costa',
      url: 'https://nave.rs/static/eca192e3c9fee202452237f40b268a0d/2a4de/vic-naver.png'
    }
  ]);
=======
type NaversListComponentProps = RowProps;

const NaversListComponent: FC<NaversListComponentProps> = ({ ...props }) => {
  const [data, setData] = useState<NaverData[]>([]);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [isErrorFetching, setIsErrorFetching] = useState<boolean>(false);
  const [messageModal, setMessageModal] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetchingData(true);
>>>>>>> 524e563 (chore(service-navers): added service for navers):src/components/Navers/NaversList.tsx

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

  const renderNaver = ({ item }) => {
<<<<<<< HEAD:src/components/Navers/NaverView.tsx
    const { id, name, jobRole, url } = item;

=======
    const { id, name, job_role: jobRole, url } = item;
    console.log(jobRole.length);
>>>>>>> 524e563 (chore(service-navers): added service for navers):src/components/Navers/NaversList.tsx
    return (
      <Column key={id} mt='28px'>
        <Image source={{ uri: url }} />
        <Column>
          <Text variant='small' lineHeight='20px' mt='8px' fontWeight={700}>
            {name}
          </Text>

          <Text variant='small' mt='4px'>
            {jobRole}
          </Text>

<<<<<<< HEAD:src/components/Navers/NaverView.tsx
          <Row mt='10px'>
            <Icon ml='5px' icon='trash'></Icon>
            <Icon ml='20px' icon='edit'></Icon>
          </Row>
        </Column>
=======
        <Row mt='10px'>
          <Icon ml='5px' icon='trash' color='black' width={14} height={18}></Icon>

          <Icon ml='24px' icon='edit' color='black' width={18.41} height={18.41}></Icon>
        </Row>
>>>>>>> 524e563 (chore(service-navers): added service for navers):src/components/Navers/NaversList.tsx
      </Column>
    );
  };

  return (
<<<<<<< HEAD:src/components/Navers/NaverView.tsx
    <Column>
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        showsVerticalScrollIndicator={false}
        data={data}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={renderNaver}
      />
=======
    <Column {...props}>
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

      <Modal isVisible={isErrorFetching} handleClose={(): void => setIsErrorFetching(false)}>
        <Column>
          <Text color='red'>{messageModal}</Text>
        </Column>
      </Modal>
>>>>>>> 524e563 (chore(service-navers): added service for navers):src/components/Navers/NaversList.tsx
    </Column>
  );
};

const Image = styled.Image`
  height: 180px;
  width: 200px;
`;

export default NaversListView;
