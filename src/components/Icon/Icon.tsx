import React, { FC } from 'react';

import { ColumnProps, Column } from 'src/components';

import {
  SVGTrash,
  SVGEdit,
  SVGClear,
  SVGHamburguer,
  SVGError,
  SVGArrowBack
} from 'src/assets/icons';
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
const ARROW_BACK = 'arrow-back';

const IconComponent: FC<IconComponentProps> = ({ icon, width, height, color, ...props }): any => {
  const renderIcon = (params: RenderIconProps): JSX.Element | undefined => {
    const { icon, ...rest } = params;

    switch (icon) {
      case HAMBURGUER:
        return <SVGHamburguer {...rest} />;

      case ERROR:
        return <SVGError {...rest} />;

      case TRASH:
        return <SVGTrash {...rest} />;

      case EDIT:
        return <SVGEdit {...rest} />;

      case CLEAR:
        return <SVGClear {...rest} />;

      case ARROW_BACK:
        return <SVGArrowBack {...rest} />;

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
