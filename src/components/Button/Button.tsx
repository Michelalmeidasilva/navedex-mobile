import React, { FC, useMemo } from 'react';

import { TouchableOpacityProps } from 'react-native';
import { variant, space, layout } from 'styled-system';
import styled from 'styled-components/native';

import { theme } from 'src/theme';
import { Text, ColumnProps } from 'src/components';

const PRIMARY = 'primary';
const SECONDARY = 'secondary';

interface ButtonComponentProps extends ColumnProps, TouchableOpacityProps {
  title: string;
  variant?: string;
  disabled?: boolean;
  accessibilityLabel: string;
}
interface StyledButtonProps extends TouchableOpacityProps {
  variant?: string;
}
const ButtonComponent: FC<ButtonComponentProps> = ({ title, variant, disabled, ...props }) => {
  const { colors } = theme;

  const textColor = useMemo(() => (variant === PRIMARY ? 'white' : 'black'), [variant, colors]);

  return (
    <StyledButton variant={variant} {...props}>
      <Text variant='small' color={textColor} fontWeight={600} lineHeight='24px'>
        {title}
      </Text>
    </StyledButton>
  );
};

const StyledButton: FC<StyledButtonProps> = styled.TouchableOpacity(
  variant({
    variants: {
      [PRIMARY]: {
        backgroundColor: 'primary',
        borderColor: 'primary'
      },
      [SECONDARY]: {
        backgroundColor: 'secondary',
        borderColor: 'black'
      }
    }
  }),
  `
    padding: 8px;
    min-height: 39px;
    border-width: 1px;
    align-items: center;
    justify-content: center;
  `,
  space,
  layout
);

export default ButtonComponent;
