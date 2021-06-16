import React, { FC } from 'react';
import { ScrollView, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoginSchema } from 'src/utils';
import { Input, Column, Text, Button } from 'src/components';

interface FormLoginData {
  email: string;
  password: string;
}

const Login: FC = () => {
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

  const handleLogin = (credentials: any) => {
    console.log(credentials);
  };
  return (
    <Column p='16px'>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*image*/}

          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, value } }): JSX.Element => (
              <Input
                mt='26px'
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
            title='Entrar'
            onPress={handleSubmit(handleLogin)}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </Column>
  );
};

export default Login;
