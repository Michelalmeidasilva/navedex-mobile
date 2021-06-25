import React, { FC } from 'react';

import styled from 'styled-components/native';
import { Modal, ViewProps, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

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
            <Row justifyContent='space-between' pl='24px' pr='21px' py='16px' alignItems='center'>
              {title && (
                <Text fontWeight={700} variant='medium'>
                  {title}
                </Text>
              )}

              <TouchableOpacity onPress={handleClose}>
                <Icon icon='clear' color='black' width={15} height={15} />
              </TouchableOpacity>
            </Row>

            {children}

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
  padding: 10px;
  justify-content: center;
`;

const Content: FC<ColumnProps> = styled(Column)`
  background: #fff;
  box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);
  max-height: 316px;
  width: 328px;
`;

ModalComponent.defaultProps = {
  containerPosition: 'center',
  animationType: 'fade'
};

export default ModalComponent;
