import React from 'react';
import styled from 'styled-components';
import { Location } from '../../Interfaces';
import { Directions } from '@styled-icons/fa-solid';

const Wrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
`;

const DirectionsIcon = styled.div`
  height: 25px;
  width: 25px;
  cursor: pointer;
  padding: 3px;
  border-radius: 50%;
  border: 3px solid transparent;
  transition: all 0.2s;

  :hover {
    border-color: currentColor;
  }
`;

interface Props {
  location: Location;
}

export default function LocationDetails({ location }: Props) {
  function getDirections(lat: number, lon: number) {
    const url = `https://www.google.fi/maps/dir//${lat},${lon}/@${lat},${lon},11z`;
    return url;
  }

  return (
    <Wrapper>
      <Address>
        <span>{location.address}</span>
        <span>
          {location.postoffice !== location.municipality
            ? `${location.postalcode}, ${location.postoffice}, ${location.municipality}`
            : `${location.postalcode}, ${location.postoffice}`}
        </span>
      </Address>
      <DirectionsIcon>
        <Directions
          onClick={() => window.open(getDirections(location.lat, location.lon))}
        />
      </DirectionsIcon>
    </Wrapper>
  );
}
