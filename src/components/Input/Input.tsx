import React, { ForwardRefRenderFunction, useState, forwardRef, useMemo } from 'react';

import { TextInputProps, KeyboardTypeOptions } from 'react-native';
import styled from 'styled-components/native';

import { Column, ColumnProps, Text } from 'src/components';
import { theme } from 'src/theme';

export interface InputRef {
  focus(): void;
}

export interface InputComponentProps extends ColumnProps {
  label?: string;
  error?: string;
  name?: string;
  value?: any;
  year?: boolean;
  editable?: boolean;
  placeholder?: string;
  onChangeText?(text: any): void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

interface StyledInputProps extends TextInputProps {
  error?: string;
  keyboardType?: KeyboardTypeOptions;
}

const InputComponent: ForwardRefRenderFunction<InputRef, InputComponentProps> = (
  {
    label,
    error,
    editable,
    name,
    value,
    placeholder,
    onChangeText,
    secureTextEntry = false,
    keyboardType,
    children,
    year,
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
          editable={editable}
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

const StyledInput = styled.TextInput<StyledInputProps>`
  height: 40px;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  color: #212121;
  background-color: transparent;
`;

export default forwardRef(InputComponent);
