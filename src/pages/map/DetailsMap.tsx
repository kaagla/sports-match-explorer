import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Match, Location } from '../../Interfaces';
import { useData, DataProps } from '../../services/useData';
import Map from './Map';

const Wrapper = styled.div`
  width: 95%;
  height: 95vh;
  /*max-height: 600px;*/
  margin-top: 10px;
  margin-bottom: 30px;
  align-self: center;
`;

interface Props {
  id: string;
  category: string;
  matches: Match[];
}

export default function DetailsMap(props: Props) {
  const dataProps: DataProps = {
    category: props.category,
    id: props.id,
    resource: 'locations',
  };
  const [locations, loading, error] = useData(dataProps);
  const [locIds, setLocIds] = useState<string[]>([]);

  useEffect(() => {
    if (props.matches.length > 0) {
      const ids = new Set<string>([]);
      props.matches.map((match: Match) => ids.add(match.location_id));
      setLocIds(Array.from(ids));
    }
  }, [props.matches]);

  return (
    <Wrapper>
      <Map
        locations={locations.filter(
          (l: Location) => locIds.includes(l.id) && l.id !== 'loc-0'
        )}
        matches={props.matches}
      />
    </Wrapper>
  );
}
