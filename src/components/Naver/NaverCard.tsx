import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { Row, Column, Text, Icon, RowProps, NaverDeleteModal } from 'src/components';

import { TouchableOpacity } from 'react-native';
import { validateImage } from 'src/utils';

export interface NaverData {
  id: string;
  name: string;
  admissionDate: string;
  job_role: string;
  user_id: string;
  project: string;
  birthdate: string;
  url: string;
}

interface NaverCardProps extends RowProps {
  item: NaverData;
}

const NaverCardComponent: FC<NaverCardProps> = ({ item, ...props }) => {
  const { id, name, job_role: jobRole, url } = item;
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  return (
    <Column key={id} {...props}>
      <Image
        source={{
          uri: validateImage(url)
        }}
      />

      <Column>
        <Text variant='small' lineHeight='20px' mt='8px' fontWeight={700}>
          {name}
        </Text>

        <Text variant='small' mt='4px'>
          {jobRole.length > 23 ? jobRole.substr(0, 23).concat('...') : jobRole}
        </Text>
      </Column>

      <Row mt='10px'>
        <TouchableOpacity onPress={() => setIsOpenDeleteModal(true)}>
          <Icon ml='5px' icon='trash' color='black' width={14} height={18} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Icon ml='24px' icon='edit' color='black' width={18.41} height={18.41} />
        </TouchableOpacity>
      </Row>

      <NaverDeleteModal
        idUser={id}
        isVisible={isOpenDeleteModal}
        setIsVisible={setIsOpenDeleteModal}
      />
    </Column>
  );
};

const Image = styled.Image`
  height: 180px;
`;

export default NaverCardComponent;
