import React, { FC } from 'react';

import { ColumnProps, Column } from 'src/components';
import SvgHamburguer from 'src/assets/icons/SvgHamburguer';
import SvgError from 'src/assets/icons/SvgError';

export interface SVGProps {
  width?: number;
  height?: number;
  color?: string;
}

interface RenderIconProps {
  icon: string;
  width?: number;
  height?: number;
  color?: string;
}

interface IconComponentProps extends ColumnProps {
  icon: string;
  width?: number;
  height?: number;
  color?: string;
}

const HAMBURGUER = 'hamburguer';
const ERROR = 'error';

const IconComponent: FC<IconComponentProps> = ({ icon, width, height, color, ...props }): any => {
  const renderIcon = (params: RenderIconProps): JSX.Element | undefined => {
    const { icon, ...rest } = params;

    switch (icon) {
      case HAMBURGUER:
        return <SvgHamburguer {...rest} />;

      case ERROR:
        return <SvgError {...rest} />;

      default:
        throw new InvalidNameIconError();
    }
  };

  return <Column {...props}>{renderIcon({ icon, width, height, color })}</Column>;
};

class InvalidNameIconError extends Error {
  constructor() {
    super();
    this.name = 'InvalidNameIconError';
  }
}

export default IconComponent;
