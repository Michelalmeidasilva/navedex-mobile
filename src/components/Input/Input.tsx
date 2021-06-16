import React, {
  ForwardRefRenderFunction,
  useState,
  MutableRefObject,
  forwardRef,
  useMemo
} from 'react';

import { TextInputProps, KeyboardTypeOptions } from 'react-native';
import styled from 'styled-components/native';

import { Column, ColumnProps, RowProps, Row, Text, Icon } from 'src/components';
import { theme } from 'src/theme';

export interface InputRef {
  focus(): void;
}

export interface InputComponentProps extends ColumnProps {
  label?: string;
  error?: string;
  name?: string;
  value?: string;
  color?: string;
  placeholder?: string;
  onChangeText?(text: string): void;
  secureTextEntry?: boolean;
  labelBackground?: string;
  keyboardType?: KeyboardTypeOptions;
}

interface StyledInputProps extends TextInputProps {
  name?: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  ref?: any;
}

const InputComponent: ForwardRefRenderFunction<InputRef, InputComponentProps> = (
  {
    label,
    name,
    value,
    keyboardType,
    onChangeText,
    placeholder,
    error,
    secureTextEntry = false,
    color,
    ...props
  },
  ref
) => {
  const { colors } = theme;

  const [isFocused, setIsFocused] = useState(false);

  const getColorBorder = useMemo(() => (error ? colors.error : isFocused ? 'blue' : 'black'));

  return (
    <Column {...props}>
      {label && (
        <Text variant='small' lineHeight='18px' color='#212121' fontWeight={700} mb='4px'>
          {label}
        </Text>
      )}

      <ContainerInput borderColor={getColorBorder} {...props}>
        <StyledInput
          name={name}
          value={value}
          error={error}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          ref={ref}
        />
      </ContainerInput>

      {error && (
        <Text mt='5px' variant='small' color={colors.error} marginLeft='7px'>
          {error}
        </Text>
      )}
    </Column>
  );
};

const ContainerInput = styled.View<ColumnProps>`
  align-items: center;
  flex-direction: row;
  border: 1px solid ${props => props.borderColor};
  border-radius: 0px;
  background-color: transparent;
`;

const StyledInput = styled.TextInput.attrs(({ ...props }) => ({
  ...props
}))<StyledInputProps>`
  height: 40px;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  color: #212121;
  background-color: transparent;
`;

export default forwardRef(InputComponent);
