import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SVGProps } from 'src/components/Icon';

const SVGError = ({ color, height, width }: SVGProps): JSX.Element => (
  <Svg width={width} height={height} viewBox='0 0 19 19' fill='none'>
    <Path
      d='M0 15.25V19H3.75L14.81 7.94L11.06 4.19L0 15.25ZM18.41 4.34L14.66 0.589996L12.13 3.13L15.88 6.88L18.41 4.34Z'
      fill={color}
    />
  </Svg>
);

export default SVGError;
