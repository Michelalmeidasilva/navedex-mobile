import React, { FC, useState } from 'react';

import { ScrollView, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input, Column, Button, Modal } from 'src/components';
import { LoginSchema } from 'src/utils';
import { CredentialsParams } from 'src/context';
import { IMAGES_URL } from 'src/constants';

interface FormLoginData {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormLoginData>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleLogin = (credentials: CredentialsParams) => {
    try {
      console.log(credentials);
    } catch (error) {
      setErrorMessage(error?.message);
      setDisplayErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Column p='16px'>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Column alignItems='center' mt={106}>
            <Image style={{ width: 156, height: 40 }} source={IMAGES_URL.logo} />
          </Column>

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
            title='Entrar'
            onPress={handleSubmit(handleLogin)}
          />

          <Modal
            open={displayErrorAlert}
            title='Alerta!'
            description={errorMessage}
            firstButton={{
              label: 'Fechar',
              action: () => setDisplayErrorAlert(false)
            }}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </Column>
  );
};

export default Login;
