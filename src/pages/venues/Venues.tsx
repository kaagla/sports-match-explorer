import React from 'react';
import {
  ListUL,
  ListItem,
  ItemTitle,
  ItemName,
  ItemIcon,
} from '../utils/ListComponents';
import { useData, DataProps } from '../../services/useData';
import styled from 'styled-components';
import { CheckmarkCircle2Outline } from '@styled-icons/evaicons-outline';
import { Venue } from '../../Interfaces';

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

interface VenueProps {
  id: string;
  category: string;
  selectedVenues: Venue[];
  setSelectedVenues: (venues: Venue[]) => void;
}

export default function Venues(props: VenueProps) {
  const dataProps: DataProps = {
    category: props.category,
    id: props.id,
    resource: 'venues',
  };
  const [venues, loading, error] = useData(dataProps);

  function isSelected(venue: Venue) {
    if (props.selectedVenues.filter((v) => v.id === venue.id).length > 0) {
      return true;
    }
    return false;
  }

  function handleSelect(venue: Venue) {
    if (isSelected(venue)) {
      props.setSelectedVenues(
        props.selectedVenues.filter((v) => v.id !== venue.id)
      );
    } else {
      props.setSelectedVenues([...props.selectedVenues, venue]);
    }
  }

  if (error) {
    return <div>Virhe tapahtunut...</div>;
  }

  return (
    <Wrapper>
      <Heading>Ottelupaikat</Heading>
      <ListUL>
        {venues.map((venue: Venue) => (
          <ListItem
            key={venue.id}
            selected={
              props.selectedVenues.filter((v) => v.id === venue.id).length > 0
            }
            onClick={() => handleSelect(venue)}
          >
            <ItemTitle>
              <ItemName>{venue.name}</ItemName>
            </ItemTitle>
            {isSelected(venue) && (
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
