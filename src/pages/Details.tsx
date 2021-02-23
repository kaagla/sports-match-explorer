import { RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Team, Match } from '../Interfaces';
import { useData, DataProps } from '../services/useData';
import Header from './utils/Header';
import ItemDetails from './utils/ItemDetails';
import Matches from './matches/Matches';
import Teams from './teams/Teams';
import DetailsMap from './map/DetailsMap';

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
  display: flex;
  flex-direction: column;
  align-items: center;

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

const SelectionContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SelectionItem = styled.div`
  background-color: #1f2833;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 5px;
  cursor: pointer;

  :hover {
    background-color: rgba(102, 252, 241, 0.2);
  }
`;

const MapDiv = styled.div`
  width: 95%;
  height: 95vh;
  max-height: 600px;
  margin-top: 10px;
  margin-bottom: 30px;
  align-self: center;
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
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [selectedMatches, setSelectedMatches] = useState<Match[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  const item: Item = Array.isArray(response) ? response[0] : response;

  function selectedTeamIds(): string[] {
    const ids: string[] = [];
    selectedTeams.map((t) => ids.push(t.id));
    return ids;
  }

  function matchesForMap() {
    if (selectedMatches.length > 0) {
      return selectedMatches;
    } else {
      if (selectedTeamIds().length > 0) {
        const matchesSelectedTeams = matches.filter((m) =>
          [m.hometeam_id, m.awayteam_id].some((id: string) =>
            selectedTeamIds().includes(id)
          )
        );
        return matchesSelectedTeams;
      } else {
        return matches;
      }
    }
  }

  function unselectMatch(matchId: string) {
    const newSelectedMatches: Match[] = selectedMatches.filter(
      (m) => m.id !== matchId
    );
    setSelectedMatches(newSelectedMatches);
  }

  function unselectTeam(teamId: string) {
    const newSelectedTeams: Team[] = selectedTeams.filter(
      (t) => t.id !== teamId
    );
    setSelectedTeams(newSelectedTeams);
  }

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
          <Matches
            title="Ottelut"
            category={props.category}
            id={props.id}
            selectedTeamIds={selectedTeamIds()}
            selectedMatches={selectedMatches}
            setSelectedMatches={setSelectedMatches}
            setMatches={setMatches}
          />
          <SelectionContent>
            {selectedTeams.length > 0 &&
              selectedTeams.map((team: Team) => (
                <SelectionItem
                  key={team.id}
                  onClick={() => unselectTeam(team.id)}
                >
                  {team.name} - {team.league} X
                </SelectionItem>
              ))}
          </SelectionContent>
          <SelectionContent>
            {selectedMatches.length > 0 &&
              selectedMatches.map((match: Match) => (
                <SelectionItem
                  key={match.id}
                  onClick={() => unselectMatch(match.id)}
                >
                  {match.hometeam} - {match.awayteam} X
                </SelectionItem>
              ))}
          </SelectionContent>
          <DetailsMap
            id={props.id}
            category={props.category}
            matches={matchesForMap()}
          />
        </MatchContent>
        {['clubs', 'leagues'].includes(props.category) && (
          <TeamContent>
            <Teams
              id={props.id}
              category={props.category}
              selectedTeams={selectedTeams}
              setSelectedTeams={setSelectedTeams}
            />
          </TeamContent>
        )}
      </Content>
    </Container>
  );
}
