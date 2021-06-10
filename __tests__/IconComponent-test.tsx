/**
 * @format
 */

import 'react-native';
import React from 'react';
import { Icon } from 'src/components/';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Icon icon='hamburguer' />);
});
