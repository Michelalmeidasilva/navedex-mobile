import React, { FC, useState, useEffect, useContext, createContext } from 'react';
import { format } from 'date-fns';

import { Modal, Text, Column, NaverData } from 'src/components';
import { getNavers, deleteNaver, createNaver, updateNaverById } from 'src/services';

type Naver = NaverData;

type ContextProps = {
  navers?: Naver[] | null;
  isFetchingData: boolean;
  setNavers?(user: Naver[]): void;
  fetchNavers?(): void;
  destroyNaver?(idUser: any): void;
  addNaver?(naver: Naver): void;
  editNaver?(naver: Naver): void;
};

const NaverContext = createContext({} as ContextProps);

const useNaver: () => ContextProps = () => useContext(NaverContext);

const NaverProvider: FC = ({ children }) => {
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [navers, setNavers] = useState<Naver[] | null>();

  const fetchNavers: () => Promise<void> = async () => {
    try {
      setIsFetchingData(true);

      const navers = await getNavers();

      setNavers(navers);
    } catch (err) {
      setModalMessage('Erro ao atualizar os navers');
      setDisplayModal(true);
    } finally {
      setIsFetchingData(false);
    }
  };

  const destroyNaver: () => Promise<void> = async idUser => {
    await deleteNaver(idUser);

    fetchNavers();
  };

  const addNaver: () => Promise<void> = async naver => {
    await createNaver({
      ...naver,
      admission_date: format(naver.admission_date, 'dd/MM/yyyy'),
      birthdate: format(naver.birthdate, 'dd/MM/yyyy')
    });

    fetchNavers();
  };

  const editNaver: () => Promise<void> = async (naver: any) => {
    const { job_role, admission_date, birthdate, name, project, url, id } = naver;

    await updateNaverById(id, {
      job_role,
      birthdate: format(birthdate, 'dd-MM-yyyy'),
      admission_date: format(admission_date, 'dd-MM-yyyy'),
      name,
      project,
      url
    });

    await fetchNavers();
  };

  useEffect(() => {
    fetchNavers();
  }, []);

  return (
    <>
      <NaverContext.Provider
        value={{
          navers: navers,
          setNavers: setNavers,
          isFetchingData: isFetchingData,
          fetchNavers: fetchNavers,
          destroyNaver: destroyNaver,
          addNaver: addNaver,
          editNaver: editNaver
        }}
      >
        {children}
      </NaverContext.Provider>

      <Modal
        title='Erro ao carregar navers'
        isVisible={displayModal}
        handleClose={(): void => setDisplayModal(false)}
      >
        <Column justifyContent='center' alignContent='center' p='15px'>
          <Text color='black'>{modalMessage}</Text>
        </Column>
      </Modal>
    </>
  );
};

export { NaverProvider, useNaver };
