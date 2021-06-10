import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SVGProps } from 'src/components/Icon';

const SVGHamburguer = ({ width, height, color }: SVGProps): JSX.Element => (
  <Svg width={width} height={height} viewBox='0 0 24 14' fill='none'>
    <Path
      d='M1.66667 14H20.3333C20.975 14 21.5 13.475 21.5 12.8333C21.5 12.1917 20.975 11.6667 20.3333 11.6667H1.66667C1.025 11.6667 0.5 12.1917 0.5 12.8333C0.5 13.475 1.025 14 1.66667 14ZM1.66667 8.16667H20.3333C20.975 8.16667 21.5 7.64167 21.5 7C21.5 6.35833 20.975 5.83333 20.3333 5.83333H1.66667C1.025 5.83333 0.5 6.35833 0.5 7C0.5 7.64167 1.025 8.16667 1.66667 8.16667ZM0.5 1.16667C0.5 1.80833 1.025 2.33333 1.66667 2.33333H20.3333C20.975 2.33333 21.5 1.80833 21.5 1.16667C21.5 0.525 20.975 0 20.3333 0H1.66667C1.025 0 0.5 0.525 0.5 1.16667Z'
      fill={color}
    />
  </Svg>
);

export default SVGHamburguer;
