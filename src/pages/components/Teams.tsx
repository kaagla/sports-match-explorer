import React from 'react';
import {
  ListUL,
  ListItem,
  ItemTitle,
  ItemName,
  ItemDetails,
} from './ListComponents';
import { Team } from '../../Interfaces';
import { useData, DataProps } from '../../services/useData';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.div`
  height: 30px;
  width: 95%;
  margin-top: 20px;
  font-size: 20px;
`;

const TeamContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TeamCard = styled.div`
  width: 300px;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1f2833;
  border-radius: 7px;
`;

const TeamName = styled.div`
  width: 200px;
`;

interface TeamProps {
  id: string;
  category: string;
}

export default function Teams(props: TeamProps) {
  const dataProps: DataProps = {
    category: props.category,
    id: props.id,
    resource: 'teams',
  };
  const [teams, loading, error] = useData(dataProps);

  if (error) {
    return <div>Virhe tapahtunut...</div>;
  }

  return (
    <Wrapper>
      <Heading>Joukkueet</Heading>
      <ListUL>
        {teams.map((team: Team) => (
          <ListItem key={team.id}>
            <ItemTitle>
              <ItemName>{team.name}</ItemName>
              {props.category !== 'leagues' && (
                <ItemDetails>{team.league}</ItemDetails>
              )}
            </ItemTitle>
          </ListItem>
        ))}
      </ListUL>
    </Wrapper>
  );
}
