import React, { FC, useState } from 'react';

import { ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import { Input, Column, Button, Modal } from 'src/components';
import { UserSchema } from 'src/utils';

interface UserData {
  email: string;
  password: string;
}
const Signup: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleSignup = async (user: UserData) => {
    try {
      setIsLoading(true);
      console.log(user);
    } catch (error) {
      setModalMessage(error?.message);
    }
    console.log(user);
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserData>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(UserSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  return (
    <Column p='16px'>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, value } }): JSX.Element => (
              <Input
                mt='56px'
                label='E-mail'
                placeholder='E-mail'
                keyboardType='email-address'
                value={value}
                error={errors.email?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            render={({ field: { onChange, value } }): JSX.Element => (
              <Input
                mt='32px'
                label='Senha'
                placeholder='Senha'
                value={value}
                error={errors.password?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Button
            variant='primary'
            accessibilityLabel='text'
            mt={40}
            isLoading={isLoading}
            title='Cadastrar'
            onPress={handleSubmit(handleSignup)}
          />

          <Modal
            isVisible={isVisibleModal}
            title='Alerta!'
            description={modalMessage}
            handleClose={() => setIsVisibleModal(false)}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </Column>
  );
};

export default Signup;
