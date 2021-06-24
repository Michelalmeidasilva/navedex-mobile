import React, { FC } from 'react';

import { ScrollView } from 'react-native';
import NaverView from './NaverView';

const Home: FC = () => {
  return (
    <ScrollView>
      <NaverView pt='32px' />
    </ScrollView>
  );
};

export default Home;
