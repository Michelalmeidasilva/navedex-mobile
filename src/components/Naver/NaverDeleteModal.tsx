import React, { FC, useState } from 'react';
import { Row, Column, Text, Button, Modal } from 'src/components';
import { useNaver } from 'src/context';
import { useNavigation } from '@react-navigation/native';

const NaverDeleteModal: FC = ({ idUser, isVisible, setIsVisible, redirectAfterDelete }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [titleModalMessage, setTitleModalMessage] = useState<string>('');
  const [isModalMessageOpen, setIsModalMessageOpen] = useState<boolean>(false);
  const { destroyNaver } = useNaver();
  const navigation = useNavigation();
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await destroyNaver(idUser);

      setTitleModalMessage('Naver Excluido');
      setModalMessage('Naver excluido com sucesso!');
      setIsModalMessageOpen(true);
    } catch (err) {
      setTitleModalMessage('Erro');
      setModalMessage('Erro ao excluir o naver');
      setIsModalMessageOpen(true);
    } finally {
      setIsDeleting(false);
      setIsVisible(false);
    }
  };

  return (
    <>
      <Modal
        title='Excluir naver'
        isVisible={isVisible}
        handleClose={() => setIsVisible(false)}
        height={208}
      >
        <Column px='24px'>
          <Text variant='regular'>Tem certeza que deseja excluir este naver?</Text>
        </Column>

        <Row justifyContent='space-between' mt='32px' px='24px'>
          <Button
            variant='secondary'
            title='Cancelar'
            width='46.8%'
            accessibilityLabel='Botão para cancelar a exclusão do usuário'
            onPress={() => setIsVisible(false)}
          />
          <Button
            variant='primary'
            title='Excluir'
            width='46.8%'
            disabled={isDeleting}
            accessibilityLabel='Botão para excluir um usuário definitivamente'
            onPress={handleDelete}
          />
        </Row>
      </Modal>

      <Modal
        title={titleModalMessage}
        isVisible={isModalMessageOpen}
        handleClose={() => {
          if (redirectAfterDelete) {
            navigation.navigate(redirectAfterDelete);
          }
          setIsModalMessageOpen(false);
        }}
        height={108}
      >
        <Column px='24px'>
          <Text>{modalMessage}</Text>
        </Column>
      </Modal>
    </>
  );
};

export default NaverDeleteModal;
