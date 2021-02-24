import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { ArrowheadLeftOutline } from '@styled-icons/evaicons-outline';

const Wrapper = styled.div`
  width: 95%;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background-color: inherit;
  border: none;
  border-radius: 66px;
  border: 5px solid transparent;
  color: inherit;
  height: 50px;
  width: 50px;
  cursor: pointer;
  margin-right: 50px;
  transition: all 0.2s;

  :hover {
    border: 5px solid currentColor;
  }
`;

const PageTitle = styled.h1``;

interface Props {
  title?: string;
  children?: ReactNode;
}

export default function Header(props: Props) {
  return (
    <Wrapper>
      <div>
        <BackButton onClick={() => history.back()}>
          <ArrowheadLeftOutline />
        </BackButton>
      </div>
      {props.title && <PageTitle>{props.title}</PageTitle>}
      {props.children && <div>{props.children}</div>}
    </Wrapper>
  );
}
