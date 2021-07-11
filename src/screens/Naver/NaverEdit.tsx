import React, { FC, useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNaver } from 'src/context';

import { NaverEditSchema } from 'src/utils';
import { Column, Text, Modal, Button, DatePicker, Input } from 'src/components';
import { getNaverById } from 'src/services';

interface FormNaverEdit {
  name: string;
  job_role: string;
  birthdate: Date;
  admission_date: string;
  project: string;
  url: string;
}

const NaverEdit: FC = ({ route }) => {
  const [isUpdatingNaver, setIsUpdatingNaver] = useState<boolean>(false);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [isErrorFetching, setIsErrorFetching] = useState<boolean>(false);
  const { editNaver } = useNaver();

  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [messageModal, setMessageModal] = useState<string>('');
  const [titleModal, setTitleModal] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<FormNaverEdit>({
    reValidateMode: 'onSubmit',

    resolver: yupResolver(NaverEditSchema),
    defaultValues: {
      name: '',
      job_role: '',
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
        reset({
          ...naverResponse,
          admission_date: new Date(naverResponse.admission_date),
          birthdate: new Date(naverResponse.birthdate)
        });
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
      await editNaver(naver);

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
                <DatePicker
                  mt='24px'
                  label='Idade'
                  placeholder='Idade'
                  name='birthdate'
                  setValue={setValue}
                  value={value}
                  maxDate={new Date(2007, 6, 28)}
                  defaultValue={new Date(2000, 5, 20)}
                  onChange={onChange}
                  error={errors.birthdate?.message}
                />
              )}
            />

            <Controller
              name='admission_date'
              control={control}
              render={({ field: { onChange, value } }): JSX.Element => (
                <DatePicker
                  mt='24px'
                  label='Tempo de Empresa'
                  placeholder='Tempo de Empresa'
                  name='admission_date'
                  setValue={setValue}
                  value={value}
                  maxDate={new Date()}
                  defaultValue={new Date(2020, 6, 24)}
                  onChange={onChange}
                  error={errors.birthdate?.message}
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
