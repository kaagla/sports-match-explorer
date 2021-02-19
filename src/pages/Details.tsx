import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import { useData, DataProps } from '../services/useData';
import Header from './components/Header';
import ItemDetails from './components/ItemDetails';
import Matches from './components/Matches';
import Teams from './components/Teams';

const Container = styled.div`
  height: 100%;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const MatchContent = styled.div`
  width: 60%;

  @media only screen and (max-width: 1000px) {
    width: 95%;
  }
`;

const TeamContent = styled.div`
  width: 20%;

  @media only screen and (max-width: 1000px) {
    width: 95%;
  }
`;

interface DetailsProps extends RouteComponentProps {
  id: string;
  category: string;
}

interface Item {
  name: string;
  league?: string;
  sport: string;
}

export default function Details(props: DetailsProps) {
  const dataProps: DataProps = {
    category: props.category,
    id: props.id,
    resource: 'info',
  };
  const [response, loading, error] = useData(dataProps);

  const item: Item = Array.isArray(response) ? response[0] : response;

  if (error) {
    return (
      <Container>
        <Header title="Sivua ei löydy." />
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <div>Ladataan...</div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <ItemDetails name={item.name} league={item.league} sport={item.sport} />
      </Header>
      <Content>
        <MatchContent>
          <Matches title="Ottelut" category={props.category} id={props.id} />
        </MatchContent>
        {['clubs', 'leagues'].includes(props.category) && (
          <TeamContent>
            <Teams id={props.id} category={props.category} />
          </TeamContent>
        )}
      </Content>
    </Container>
  );
}
