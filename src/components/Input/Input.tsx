import React, { FC, useEffect } from 'react';
import { TextInputProps, KeyboardTypeOptions } from 'react-native';
import styled from 'styled-components/native';
import { UseFormRegister } from 'react-hook-form';

import { Column, ColumnProps, RowProps, Row, Text } from 'src/components';

interface InputComponentProps extends ColumnProps {
  label?: string;
  error?: string;
  name: string;
  value?: string;
  color?: string;
  register?(): any;
  actionButton?: boolean;
  onChange(): any;
  secureTextEntry?: boolean;
  labelBackground?: string;
  keyboardType?: KeyboardTypeOptions;
}

interface StyledInputProps extends TextInputProps {
  name?: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
}

const InputComponent: FC<InputComponentProps> = ({
  label,
  name,
  value,
  keyboardType,
  actionButton,
  onChange,
  error,
  register,
  secureTextEntry,
  color,
  ...props
}) => {
  return (
    <Column {...props}>
      {label && (
        <Text variant='small' lineHeight='18px' color='#212121' fontWeight={700} mb='4px'>
          {label}
        </Text>
      )}

      <RowContainer bg={color}>
        <StyledInput
          name={name}
          value={value}
          error={error}
          keyboardType={keyboardType}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
        />
      </RowContainer>
    </Column>
  );
};

const RowContainer = styled.View<RowProps>`
  align-items: center;
  flex-direction: row;
  border: 1px solid #424242;
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

export default InputComponent;
