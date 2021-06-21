import React, { FC } from 'react';

import styled from 'styled-components/native';
import { Modal, ViewProps, TouchableWithoutFeedback } from 'react-native';

import { Text, ButtonComponentProps, Column, Row, ColumnProps, Icon } from 'src/components';

interface ModalComponent {
  handleClose(): void;
  isVisible: boolean;
  title?: string;
  description?: string;
  animationType?: 'none' | 'slide' | 'fade';
  buttonLeft?: ButtonComponentProps;
  buttonRight?: ButtonComponentProps;
  activeOpacity?: number;
}

const ModalComponent: FC<any> = ({
  title,
  description,
  isVisible,
  handleClose,
  mainButton,
  secondButton,
  animationType,
  children,
  ...props
}) => (
  <Modal transparent visible={isVisible} animationType={animationType}>
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={handleClose}>
      <Container>
        <TouchableWithoutFeedback>
          <Content {...props}>
            {children}

            <Row>
              {title && (
                <Text mt='16px' fontSize='22px' lineHeight='32px' fontWeight={700} variant='medium'>
                  {title}
                </Text>
              )}
              <TouchableWithoutFeedback style={{ alignSelf: 'flex-end' }} onPress={handleClose}>
                <Icon icon='clear' color='black' width={14} height={14} />
              </TouchableWithoutFeedback>
            </Row>

            <Column mt='16px'>
              {description && (
                <Text variant='regular' fontWeight={400}>
                  {description}
                </Text>
              )}
            </Column>

            <Row justifyContent='space-between' mt='40px'>
              {mainButton}

              {secondButton}
            </Row>
          </Content>
        </TouchableWithoutFeedback>
      </Container>
    </TouchableWithoutFeedback>
  </Modal>
);

const Container: FC<ViewProps> = styled.View`
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  flex: 1;
  justify-content: center;
`;

const Content: FC<ColumnProps> = styled(Column)`
  background: #fff;
  box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);
  max-height: 216px;
  padding-left: 24px;
  padding-bottom: 24px;
  padding-right: 24px;
  padding-top: 16px;
  width: 320px;
`;

ModalComponent.defaultProps = {
  containerPosition: 'center',
  animationType: 'fade'
};

export default ModalComponent;
