import React, { useState } from 'react';
import {
  ListUL,
  ListItem,
  ItemTitle,
  ItemName,
  ItemDetails,
  ItemIcon,
} from '../utils/ListComponents';
import { Team } from '../../Interfaces';
import { useData, DataProps } from '../../services/useData';
import styled from 'styled-components';
import { CheckmarkCircle2Outline } from '@styled-icons/evaicons-outline';

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
  selectedTeams: Team[];
  setSelectedTeams: (teams: Team[]) => void;
}

export default function Teams(props: TeamProps) {
  const dataProps: DataProps = {
    category: props.category,
    id: props.id,
    resource: 'teams',
  };
  const [teams, loading, error] = useData(dataProps);
  //const [selectedTeams, setSelectedTeams] = useState<Team[]>([])

  function isSelected(team: Team) {
    if (props.selectedTeams.filter((t) => t.id === team.id).length > 0) {
      return true;
    }
    return false;
  }

  function handleSelect(team: Team) {
    if (isSelected(team)) {
      props.setSelectedTeams(
        props.selectedTeams.filter((t) => t.id !== team.id)
      );
    } else {
      props.setSelectedTeams([...props.selectedTeams, team]);
    }
  }

  if (error) {
    return <div>Virhe tapahtunut...</div>;
  }

  return (
    <Wrapper>
      <Heading>Joukkueet</Heading>
      <ListUL>
        {teams.map((team: Team) => (
          <ListItem
            key={team.id}
            selected={
              props.selectedTeams.filter((t) => t.id === team.id).length > 0
            }
            onClick={() => handleSelect(team)}
          >
            <ItemTitle>
              <ItemName>{team.name}</ItemName>
              {props.category !== 'leagues' && (
                <ItemDetails>{team.league}</ItemDetails>
              )}
            </ItemTitle>
            {isSelected(team) && (
              <ItemIcon>
                <CheckmarkCircle2Outline />
              </ItemIcon>
            )}
          </ListItem>
        ))}
      </ListUL>
    </Wrapper>
  );
}
