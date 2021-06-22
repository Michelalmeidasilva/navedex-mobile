import React, { FC, useState, useEffect } from 'react';

import { ScrollView, View } from 'react-native';
import { Row, Column, Text, Button, Icon } from 'src/components';
import styled from 'styled-components/native';

interface NaverData {
  id: any;
  jobRole: string;
  admissionDate: string;
  birthdate: string;
  project: string;
  name: string;
  url: string;
}

const NaversListView = () => {
  const [data, setData] = useState<NaverData[]>([
    {
      id: 3,

      jobRole: 'Business Development Executive',
      admissionDate: '19/08/2018',
      birthdate: '12/04/1992',
      project: 'Comercial',
      name: 'João Pedro Bretanha',
      url: 'https://nave.rs/static/aed895040a9baf308fb4f9e755972062/2a4de/joao-naver.png'
    },
    {
      id: 2,

      jobRole: 'Technology Coordinator',
      admissionDate: '19/08/2019',
      birthdate: '12/04/1992',
      project: 'NAVE TD',
      name: 'Gabriel do Couto Santos',
      url: 'https://nave.rs/static/e6372d1d5b14756e2e2a382bacca41b7/2a4de/couto-naver.png'
    },
    {
      id: 1,
      jobRole: 'Technology Coordinator',
      admissionDate: '19/08/2019',
      birthdate: '12/04/1992',
      project: 'NAVE TD',
      name: 'Felipe Adamoli',
      url: 'https://nave.rs/static/9ee43e0847b6dc5a48b0bbe3dcf4797c/2a4de/adamoli-naver.png'
    },
    {
      id: 4,
      jobRole: 'Marketing Coordinator',
      admissionDate: '19/08/2019',
      birthdate: '12/04/1995',
      project: 'NAVE MARKETING',
      name: 'Victória Costa',
      url: 'https://nave.rs/static/eca192e3c9fee202452237f40b268a0d/2a4de/vic-naver.png'
    }
  ]);

  useEffect(() => {}, [data]);

  return (
    <Column>
      {data &&
        data.map(({ name, url, id, jobRole }) => (
          <Container key={id}>
            <Cover>
              <Image source={{ uri: url }} />
            </Cover>
            <Content>
              <Text>{name}</Text>

              <Text>{jobRole}</Text>
              {/* <Row>
              <Icon icon='edit' width={14} height={18}></Icon>
              <Icon icon='trash' width={14} height={18}></Icon>
            </Row> */}
            </Content>
          </Container>
        ))}
    </Column>
  );
};

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Container = styled.View`
  width: 100%;
  height: 158px;
  padding-horizontal: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.View`
  padding-top: 10px;
  flex-direction: column;
  align-items: center;
  height: 60px;
`;

const Cover = styled.View`
  width: 100%;
  height: 120px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

export default NaversListView;
