import React, { useState } from 'react';
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
}

export default function Matches(props: Props) {
  const dataProps: DataProps = {
    category: props.category,
    id: props.id,
    resource: 'matches',
  };
  const [matches, loading, error] = useData(dataProps);

  const nextMatches = (m: Match[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return m.filter((match) => match.start_date >= today);
  };

  const pastMatches = (m: Match[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return m.filter((match) => match.start_date < today).reverse();
  };

  return (
    <Wrapper>
      {nextMatches(matches).length > 0 && (
        <>
          <Heading>
            <div>Tulevat ottelut</div>
          </Heading>
          <MatchContainer>
            {nextMatches(matches).map((match: Match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </MatchContainer>
        </>
      )}
      {pastMatches(matches).length > 0 && (
        <>
          <Heading>
            <div>Pelatut ottelut</div>
          </Heading>
          <MatchContainer>
            {pastMatches(matches).map((match: Match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </MatchContainer>
        </>
      )}
    </Wrapper>
  );
}
