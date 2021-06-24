import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Row, Column, Text, Icon, RowProps } from 'src/components';
import { NaverData } from 'src/services';

interface NaverCardProps extends RowProps {
  item: NaverData;
}

const NaverCardComponent: FC<NaverCardProps> = ({ item, ...props }) => {
  const { id, name, job_role: jobRole, url } = item;

  return (
    <Column key={id} {...props}>
      <Image source={{ uri: url }} />

      <Column>
        <Text variant='small' lineHeight='20px' mt='8px' fontWeight={700}>
          {name}
        </Text>

        <Text variant='small' mt='4px'>
          {jobRole.length > 23 ? jobRole.substr(0, 23).concat('...') : jobRole}
        </Text>
      </Column>

      <Row mt='10px'>
        <Icon ml='5px' icon='trash' color='black' width={14} height={18}></Icon>

        <Icon ml='24px' icon='edit' color='black' width={18.41} height={18.41}></Icon>
      </Row>
    </Column>
  );
};

const Image = styled.Image`
  height: 180px;
`;

export default NaverCardComponent;
