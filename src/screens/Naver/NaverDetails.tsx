import React, { FC, useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
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

  const getJobTime = admission_year => {
    const diffInMillisecond = new Date().valueOf() - admission_year.valueOf();

    const year_age = Math.floor(diffInMillisecond / 31536000000);
    const day_age = Math.floor((diffInMillisecond % 31536000000) / 86400000);
    const month_age = Math.floor(day_age / 30);

    let date = '';

    if (day_age === 0) {
      return 'Contratado hoje';
    }

    if (year_age > 0) {
      date = year_age === 1 ? `${year_age} ano - ` : ` ${year_age} anos - `;
    }

    if (month_age > 0) {
      date += month_age === 1 ? `${month_age} mes - ` : `${month_age} meses - `;
    }

    if (day_age > 0) {
      const days = day_age % 30;
      date += day_age === 1 ? `${days} dia ` : `${days} dias `;
    }

    return date || '- - -';
  };

  useEffect(() => {
    const fetchData = async () => {
      const { id } = route.params;

      try {
        const currentYear = new Date().getFullYear();
        setIsFetchingData(true);

        const naver = await getNaverById(id);

        setData({
          ...naver,
          age: currentYear - new Date(naver.birthdate).getFullYear(),
          admission_date: new Date(naver.admission_date)
        });
      } catch (err) {
        setIsErrorFetching(true);
        setMessageModal('Erro enquanto carregava o naver');
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
            <Text fontSize='22px' lineHeight='32' fontWeight={700} mt='4px'>
              {data?.name}
            </Text>

            <Text mt='4px' variant='regular' fontWeight={400}>
              {data?.job_role}
            </Text>

            <Text mt='24px' variant='regular' fontWeight={700}>
              Idade
            </Text>

            <Text mt='4px' variant='regular' fontWeight={400}>
              {data?.age} anos
            </Text>

            <Text mt='24px' variant='regular' fontWeight={700}>
              Tempo de Empresa
            </Text>

            <Text mt='4px' variant='regular' fontWeight={400}>
              {data && getJobTime(data?.admission_date)}
            </Text>

            <Text mt='24px' variant='regular' fontWeight={700}>
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
                redirectAfterDelete={'Naver'}
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
