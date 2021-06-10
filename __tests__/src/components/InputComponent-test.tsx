/**
 * @format
 */

import 'react-native';
import React from 'react';
import { Input } from 'src/components/';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Input name='test' onChange={() => 'test123'} />);
});

it('should be have 5 letters ', () => {
});
