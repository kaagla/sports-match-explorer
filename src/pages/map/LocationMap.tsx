import React from 'react';
import styled from 'styled-components';
import { Location } from '../../Interfaces';
import Map from './Map';

const Wrapper = styled.div`
  width: 95%;
  height: 95vh;
  max-height: 500px;
  margin-top: 10px;
  margin-bottom: 30px;
  align-self: center;
`;

interface Props {
  location: Location;
}

export default function LocationMap(props: Props) {
  return (
    <Wrapper>
      <Map
        locations={[props.location]}
        matches={[]}
        lat={props.location.lat}
        lon={props.location.lon}
      />
    </Wrapper>
  );
}
