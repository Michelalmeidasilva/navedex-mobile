import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import { Row, Column, Text, Button, Modal } from 'src/components';
import { deleteUser } from 'src/services';

const NaverDeleteModal: FC = ({ idUser, isVisible, setIsVisible }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [titleModalMessage, setTitleModalMessage] = useState<string>('');
  const [isModalMessageOpen, setIsModalMessageOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteUser(idUser);

      setIsVisible(false);
      setTitleModalMessage('Naver Excluido');
      setModalMessage('Naver excluido com sucesso!');
      setIsModalMessageOpen(true);
    } catch (err) {
      setIsVisible(false);
      setModalMessage('Erro ao excluir o naver');
      setTitleModalMessage('Erro');
      setIsModalMessageOpen(true);
    } finally {
      setIsDeleting(false);
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
        handleClose={() => setIsModalMessageOpen(false)}
        height={108}
      >
        <Column px='24'>
          <Text>{modalMessage}</Text>
        </Column>
      </Modal>
    </>
  );
};

export default NaverDeleteModal;
