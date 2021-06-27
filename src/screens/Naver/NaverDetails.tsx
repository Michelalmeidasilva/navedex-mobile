import React, { FC, useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { Row, Column, Text, Modal, Button, NaverDeleteModal, NaverData } from 'src/components';
import { getNaverById } from 'src/services';
import { validateImage } from 'src/utils';

const NaverDetails: FC = ({ route }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const [data, setData] = useState<NaverData>();
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [isErrorFetching, setIsErrorFetching] = useState<boolean>(false);
  const [messageModal, setMessageModal] = useState<string>('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const { id } = route.params;

      try {
        setIsFetchingData(true);
        const naver = await getNaverById(id);
        setData({
          ...naver
        });
      } catch (err) {
        setIsErrorFetching(true);
        setMessageModal(err?.message || 'Erro enquanto carregava o naver');
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      {isFetchingData ? (
        <Column p='150px' justifyContent='center' alignItems='center'>
          <ActivityIndicator size='large' color='#0000ff' />
        </Column>
      ) : (
        <Column>
          <Image
            source={{
              uri: validateImage(data?.url)
            }}
          />
          <Column mx='16px' my='24px'>
            <Text fontSize='22px' lineHeight='32' fontWeight={600} mt='4px'>
              {data?.name}
            </Text>

            <Text mt='4px' variant='regular' fontWeight={400}>
              {data?.job_role}
            </Text>

            <Text mt='24px' variant='regular' fontWeight={600}>
              Idade
            </Text>

            <Text mt='4px' variant='regular' fontWeight={400}>
              {data?.age}
            </Text>

            <Text mt='24px' variant='regular' fontWeight={600}>
              Tempo de Empresa
            </Text>

            <Text mt='4px' variant='regular' fontWeight={400}>
              {data?.admission_date}
            </Text>

            <Text mt='24px' variant='regular' fontWeight={600}>
              Projetos que participou
            </Text>

            <Text mt='4px' variant='regular' fontWeight={400}>
              {data?.project}
            </Text>

            <Row mt='32px' justifyContent='space-between'>
              <Button
                accessibilityLabel='Botão de excluir um usuário'
                title='Excluir'
                variant='secondary'
                nameIcon='trash'
                widthIcon={14}
                width='47.6%'
                onPress={() => setIsOpenDeleteModal(true)}
                heightIcon={18}
              />
              <Button
                accessibilityLabel='Botão de editar um usuário'
                title='Editar'
                variant='primary'
                nameIcon='edit'
                width='47.6%'
                onPress={() => navigation.push('NaverEdit', { paramsId: data?.id })}
                widthIcon={14}
                heightIcon={18}
              />

              <NaverDeleteModal
                idUser={data?.id}
                isVisible={isOpenDeleteModal}
                setIsVisible={setIsOpenDeleteModal}
              />
            </Row>
          </Column>
        </Column>
      )}

      <Modal
        title='Erro'
        isVisible={isErrorFetching}
        handleClose={(): void => setIsErrorFetching(false)}
      >
        <Column p='24px'>
          <Text>{messageModal}</Text>
        </Column>
      </Modal>
    </ScrollView>
  );
};

const Image = styled.Image`
  height: 300px;
`;

export default NaverDetails;
