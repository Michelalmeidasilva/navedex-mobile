import React, { FC, useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, ScrollView } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { NaverEditSchema } from 'src/utils';
import { Row, Column, Text, Modal, Button, NaverData, Input } from 'src/components';
import { getNaverById, updateNaverById } from 'src/services';

interface FormNaverEdit {
  name: string;
  job_role: string;
  birthdate: string;
  admission_date: string;
  project: string;
  url: string;
}

const NaverEdit: FC = ({ route }) => {
  const [naver, setNaver] = useState<NaverData>();
  const [isUpdatingNaver, setIsUpdatingNaver] = useState<boolean>(false);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [isErrorFetching, setIsErrorFetching] = useState<boolean>(false);

  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [messageModal, setMessageModal] = useState<string>('');
  const [titleModal, setTitleModal] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormNaverEdit>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(NaverEditSchema),
    defaultValues: {
      name: '',
      job_role: '',
      birthdate: '',
      project: '',
      url: ''
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const { paramsId } = route.params;
      try {
        setIsFetchingData(true);
        const naverResponse = await getNaverById(paramsId);
        setNaver(naverResponse);
      } catch (err) {
        setMessageModal('Erro ao carregar o naver');
        setIsErrorFetching(true);
      } finally {
        setIsFetchingData(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateNaver = async (naver: FormNaverEdit): Promise<void> => {
    try {
      setIsUpdatingNaver(true);

      await updateNaverById(naver.id, naver);

      setTitleModal('Naver Editado');
      setMessageModal('Naver editado com sucesso');
      setIsVisibleModal(true);
    } catch (err) {
      setTitleModal('Erro');
      setMessageModal('Erro ao atualizar o naver');
      setIsVisibleModal(true);
    } finally {
      setIsUpdatingNaver(false);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        {isFetchingData ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          <Column px='16px'>
            <Text textAlign='center' pt='32px' fontSize='22px' lineHeight='32px' fontWeight={600}>
              Editar naver
            </Text>
            <Controller
              name='name'
              control={control}
              render={({ field: { onChange, value } }): JSX.Element => (
                <Input
                  mt='24px'
                  label='Nome'
                  placeholder='Nome'
                  value={value}
                  error={errors.name?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              name='job_role'
              control={control}
              render={({ field: { onChange, value } }): JSX.Element => (
                <Input
                  mt='24px'
                  label='Cargo'
                  placeholder='Cargo'
                  value={value}
                  error={errors.job_role?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              name='birthdate'
              control={control}
              render={({ field: { onChange, value } }): JSX.Element => (
                <Input
                  mt='24px'
                  label='Idade'
                  placeholder='Idade'
                  value={value}
                  error={errors.birthdate?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              name='admission_date'
              control={control}
              render={({ field: { onChange, value } }): JSX.Element => (
                <Input
                  mt='24px'
                  label='Tempo de Empresa'
                  placeholder='Tempo de Empresa'
                  value={value}
                  error={errors.admission_date?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              name='project'
              control={control}
              render={({ field: { onChange, value } }): JSX.Element => (
                <Input
                  mt='24px'
                  label='Projetos que participou'
                  placeholder='Projetos que participou'
                  keyboardType='default'
                  value={value}
                  error={errors.project?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              name='url'
              control={control}
              render={({ field: { onChange, value } }): JSX.Element => (
                <Input
                  mt='24px'
                  label='URL da foto naver'
                  placeholder='URL da foto naver'
                  keyboardType='default'
                  value={value}
                  error={errors.url?.message}
                  onChangeText={onChange}
                />
              )}
            />

            <Button
              mt='40px'
              disabled={isUpdatingNaver}
              isLoading={isUpdatingNaver}
              variant='primary'
              accessibilityLabel='Botão de acessibilidade'
              title='Salvar'
              onPress={handleSubmit(handleUpdateNaver)}
            />
          </Column>
        )}

        <Modal
          title={titleModal}
          isVisible={isVisibleModal}
          handleClose={(): void => setIsVisibleModal(false)}
        >
          <Column pl='24px'>
            <Text variant='regular' color='black'>
              {messageModal}
            </Text>
          </Column>
        </Modal>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default NaverEdit;
