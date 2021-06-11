import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SVGProps } from 'src/components/Icon';

const SVGTrash = ({ width, height, color }: SVGProps): JSX.Element => (
  <Svg width={width} height={height} viewBox='0 0 15 18' fill='none'>
    <Path d='M1.5 18H13.5V4H1.5V18ZM14.5 1H11L10 0H5L4 1H0.5V3H14.5V1Z' fill={color} />
  </Svg>
);

export default SVGTrash;
