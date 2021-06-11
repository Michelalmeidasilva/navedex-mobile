import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SVGProps } from 'src/components/Icon';

const SVGError = ({ color, height, width }: SVGProps): JSX.Element => (
  <Svg width={height} height={width} viewBox='0 0 14 12' fill='none'>
    <Path
      d='M1.98 12H12.02C13.0467 12 13.6867 10.8867 13.1733 10L8.15333 1.32667C7.64 0.44 6.36 0.44 5.84667 1.32667L0.826666 10C0.313333 10.8867 0.953333 12 1.98 12ZM7 7.33333C6.63333 7.33333 6.33333 7.03333 6.33333 6.66667V5.33333C6.33333 4.96667 6.63333 4.66667 7 4.66667C7.36667 4.66667 7.66667 4.96667 7.66667 5.33333V6.66667C7.66667 7.03333 7.36667 7.33333 7 7.33333ZM7.66667 10H6.33333V8.66667H7.66667V10Z'
      fill={color}
    />
  </Svg>
);

export default SVGError;
