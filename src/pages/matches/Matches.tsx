import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Match } from '../../Interfaces';
import { useData, DataProps } from '../../services/useData';
import MatchCard from './MatchCard';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Heading = styled.div`
  height: 30px;
  width: 95%;
  margin-top: 20px;
  font-size: 20px;
`;

const MatchContainer = styled.div`
  height: 300px;
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: row;

  ::-webkit-scrollbar {
    width: 10px;
    height: 15px;
  }

  /*::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }*/

  ::-webkit-scrollbar-thumb {
    background-color: currentColor;
    outline: 5px solid #1f2833;
  }
`;

interface Props {
  title: string;
  category: string;
  id: string;
  selectedTeamIds: string[];
  selectedMatches: Match[];
  setSelectedMatches: (m: Match[]) => void;
  setMatches: (m: Match[]) => void;
}

export default function Matches(props: Props) {
  const dataProps: DataProps = {
    category: props.category,
    id: props.id,
    resource: 'matches',
  };
  const [matches, loading, error] = useData(dataProps);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isFutureMatch = (d: Date) => {
    if (new Date(d) < today) {
      return false;
    } else {
      return true;
    }
  };

  function nextMatches() {
    if (props.selectedTeamIds.length === 0) {
      return matches.filter((match: Match) => isFutureMatch(match.start_date));
    }

    return matches.filter(
      (match: Match) =>
        isFutureMatch(match.start_date) &&
        [match.hometeam_id, match.awayteam_id].some((id) =>
          props.selectedTeamIds.includes(id)
        )
    );
  }

  function pastMatches() {
    if (props.selectedTeamIds.length === 0) {
      return matches
        .filter((match: Match) => !isFutureMatch(match.start_date))
        .reverse();
    }

    return matches
      .filter(
        (match: Match) =>
          !isFutureMatch(match.start_date) &&
          [match.hometeam_id, match.awayteam_id].some((id) =>
            props.selectedTeamIds.includes(id)
          )
      )
      .reverse();
  }

  function isSelected(match: Match) {
    if (props.selectedMatches.filter((m) => m.id === match.id).length > 0) {
      return true;
    }
    return false;
  }

  function handleSelect(match: Match) {
    if (match.location_id !== 'loc-0') {
      if (isSelected(match)) {
        props.setSelectedMatches(
          props.selectedMatches.filter((m) => m.id !== match.id)
        );
      } else {
        props.setSelectedMatches([...props.selectedMatches, match]);
      }
    }
  }

  useEffect(() => {
    if (matches.length > 0) {
      props.setMatches(matches);
    }
  }, [matches]);

  return (
    <Wrapper>
      {nextMatches().length > 0 && (
        <>
          <Heading>
            <div>Tulevat ottelut</div>
          </Heading>
          <MatchContainer>
            {nextMatches().map((match: Match) => (
              <MatchCard
                key={match.id}
                match={match}
                isSelected={isSelected(match)}
                handleSelect={handleSelect}
              />
            ))}
          </MatchContainer>
        </>
      )}
      {pastMatches().length > 0 && (
        <>
          <Heading>
            <div>Pelatut ottelut</div>
          </Heading>
          <MatchContainer>
            {pastMatches().map((match: Match) => (
              <MatchCard
                key={match.id}
                match={match}
                isSelected={isSelected(match)}
                handleSelect={handleSelect}
              />
            ))}
          </MatchContainer>
        </>
      )}
    </Wrapper>
  );
}
