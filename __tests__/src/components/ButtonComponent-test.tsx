/**
 * @format
 */

import 'react-native';
import React from 'react';
import { Button } from 'src/components/';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(
    <Button variant='primary' accessibilityLabel='press button' title='test' disabled />
  );
});
