import React, { FC } from 'react';

import { ColumnProps, Column } from 'src/components';

import { SVGTrash, SVGEdit, SVGClear, SVGHamburguer, SVGError } from 'src/assets/icons';
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
const EDIT = 'edit';
const TRASH = 'trash';
const CLEAR = 'clear';

const IconComponent: FC<IconComponentProps> = ({ icon, width, height, color, ...props }): any => {
  const renderIcon = (params: RenderIconProps): JSX.Element | undefined => {
    const { icon, ...rest } = params;

    switch (icon) {
      case HAMBURGUER:
        return <SVGHamburguer {...rest} />;

      case ERROR:
        return <SVGError {...rest} />;

      case TRASH:
        return <SVGTrash />;

      case EDIT:
        return <SVGEdit />;

      case CLEAR:
        return <SVGClear />;

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
