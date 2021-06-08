import React, { FC } from 'react';

import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Login: FC = () => (
  <KeyboardAwareScrollView
    enableOnAndroid={true}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
  >
    <Text>Login</Text>
  </KeyboardAwareScrollView>
);

export default Login;
