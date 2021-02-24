import React from 'react';
import styled from 'styled-components';
import { SearchOutline } from '@styled-icons/evaicons-outline';

const Wrapper = styled.div`
  width: 85%;
  max-width: 300px;
  height: 50px;
  border-radius: 7px;
  border: 3px solid currentColor;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const SearcIcon = styled(SearchOutline)`
  height: 30px;
  width: 30px;
  color: inherit;
`;

const Input = styled.input`
  border: none;
  font: inherit;
  color: inherit;
  background-color: inherit;
  width: 70%;
  height: 30px;
  /*border-bottom: solid currentColor 2px;*/

  :focus {
    outline: none;
  }
`;

interface Props {
  category: string;
  text: string;
  handleTextChange: (text: string) => void;
}

export default function Searchfield({
  text,
  handleTextChange,
  category,
}: Props) {
  const placeholderText = (searchCategory: string): string => {
    switch (searchCategory) {
      case 'teams':
        return 'Etsi joukkuetta...';
      case 'clubs':
        return 'Etsi seuraa...';
      case 'leagues':
        return 'Etsi sarjaa...';
      default:
        return 'Etsi kohdetta...';
    }
  };

  return (
    <Wrapper>
      <SearcIcon />
      <Input
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        type="search"
        placeholder={placeholderText(category)}
      />
    </Wrapper>
  );
}
