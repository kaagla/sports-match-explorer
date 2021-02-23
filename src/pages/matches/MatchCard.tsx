import React from 'react';
import styled, { css } from 'styled-components';
import { Match } from '../../Interfaces';
import { CheckmarkCircle2Outline } from '@styled-icons/evaicons-outline';

const Wrapper = styled.div<{ selected: boolean; hasLocation: boolean }>`
  width: 210px;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => (props.selected ? '#66fcf166' : '#1f2833')};
  border-radius: 7px;
  position: relative;
  transition: all 0.3s;

  ${(props) =>
    props.hasLocation &&
    css`
      cursor: pointer;

      &:hover {
        background-color: rgba(102, 252, 241, 0.2);
      }
    `}
`;

const League = styled.div`
  height: 60px;
  width: 210px;
  text-align: center;
`;

const Icon = styled.div`
  height: 20px;
  width: 20px;
  color: inherit;
`;

const Teams = styled.div`
  width: 210px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const DateDiv = styled.div`
  width: 210px;
  padding-top: 20px;
  text-align: center;
`;

const Venue = styled.div`
  width: 210px;
  padding-top: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const SelectedIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  z-index: 1;
`;

interface MatchProps {
  match: Match;
  isSelected: boolean;
  handleSelect: (match: Match) => void;
}

export default function MatchCard({
  match,
  isSelected,
  handleSelect,
}: MatchProps) {
  const VenueDiv = (venue: string, municipality: string) => {
    if (venue.toLowerCase().includes(municipality.toLowerCase())) {
      return <span>{venue}</span>;
    } else {
      return (
        <>
          <span>{venue},</span>
          <span>{municipality}</span>
        </>
      );
    }
  };

  const displayDate = (date: string): string => {
    const currentYear = new Date().getFullYear().toString();

    if (date.split('.')[date.split('.').length - 1] === currentYear) {
      return date.split('.').slice(0, -1).join('.') + '.';
    } else {
      return date;
    }
  };

  return (
    <Wrapper
      hasLocation={match.location_id !== 'loc-0'}
      selected={isSelected}
      onClick={() => handleSelect(match)}
    >
      {isSelected && (
        <SelectedIcon>
          <CheckmarkCircle2Outline />
        </SelectedIcon>
      )}
      <League>
        <span>{match.league}</span>
      </League>
      <Teams>
        <span>{match.hometeam}</span>
        <span>{match.score}</span>
        <span>{match.awayteam}</span>
      </Teams>
      <DateDiv>
        <span>{displayDate(match.date)}</span>
        {match.time !== '--:--' && <span> {match.time}</span>}
      </DateDiv>
      {match.venue !== 'Ei tiedossa' && (
        <Venue>{VenueDiv(match.venue, match.municipality)}</Venue>
      )}
    </Wrapper>
  );
}
