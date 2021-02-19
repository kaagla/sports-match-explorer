import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  font-size: 30px;

  @media only screen and (max-width: 600px) {
    font-size: 20px;
  }
`;

interface Item {
  name: string;
  league?: string;
  sport: string;
}

export default function ItemDetails(props: Item) {
  return (
    <Wrapper>
      <span>
        {props.name} - {props.league ? props.league + ' - ' : ''}
        {props.sport}
      </span>
    </Wrapper>
  );
}
