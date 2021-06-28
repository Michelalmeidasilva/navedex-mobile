import React, { FC, useState, useCallback } from 'react';
import { ScrollView } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Column, Text, Modal, Input, Button, DatePicker } from 'src/components';
import { createNaver } from 'src/services';
import { NaverAddSchema } from 'src/utils';

interface FormNaverAdd {
  name: string;
  job_role: string;
  birthdate: Date;
  admission_date: string;
  project: string;
  url: string;
}

const NaverAdd: FC = () => {
  const [isAddingNaver, setIsAddingNaver] = useState<boolean>(false);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [messageModal, setMessageModal] = useState<string>('');
  const [titleModal, setTitleModal] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormNaverAdd>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(NaverAddSchema),
    defaultValues: {
      name: '',
      job_role: '',
      project: '',
      url: ''
    }
  });

  const handleAddNaver = async (naver: FormNaverAdd): Promise<void> => {
    try {
      setIsAddingNaver(true);

      await createNaver(naver);

      setTitleModal('Naver Adicionado');
      setMessageModal('Naver Adicionado com sucesso!');
      setIsVisibleModal(true);
    } catch (err) {
      setTitleModal('Erro');
      setMessageModal('Erro ao adicionar o naver');
      setIsVisibleModal(true);
    } finally {
      setIsAddingNaver(false);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <Text textAlign='center' pt='32px' fontSize='22px' lineHeight='32px' fontWeight={600}>
          Adicionar naver
        </Text>

        <Column px='16px'>
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
                value={value}
                onChange={onChange}
                error={errors.birthdate?.message}
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
            disabled={isAddingNaver}
            isLoading={isAddingNaver}
            title='Salvar'
            variant='primary'
            onPress={handleSubmit(handleAddNaver)}
            accessibilityLabel='Botão utilizado para enviar os dados e salvar um novo naver'
          />

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
        </Column>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default NaverAdd;
