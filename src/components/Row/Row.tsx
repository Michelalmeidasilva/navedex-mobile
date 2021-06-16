import { FC } from 'react';
import styled from 'styled-components/native';
import {
  space,
  layout,
  color,
  flexbox,
  SpaceProps,
  LayoutProps,
  ColorProps,
  FlexboxProps,
  PositionProps,
  BorderProps
} from 'styled-system';

type StyledProps = SpaceProps &
  LayoutProps &
  ColorProps &
  FlexboxProps &
  PositionProps &
  BorderProps;

export interface RowProps extends StyledProps {
  as?: any;
}

const RowComponent: FC<RowProps> = styled.View<RowProps>(
  { flexDirection: 'row' },
  space,
  layout,
  color,
  flexbox
);

export default RowComponent;
