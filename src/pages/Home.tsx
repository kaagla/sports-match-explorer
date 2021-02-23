import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import { Users, Trophy, SportsClub } from '@styled-icons/entypo';
import { StyledLink } from './utils/ListComponents';

const Container = styled.div`
  height: 100%;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const CategoryItems = styled.div`
  width: 90%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700px;
  letter-spacing: 2px;
  margin-top: 10px;
`;

const CategoryItem = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 7px;
  border: 5px solid currentColor;
  margin-top: 30px;
  margin-bottom: 30px;
  cursor: pointer;
  background-color: transparent;
  transition: all 0.3s;

  :hover {
    background-color: #66fcf1;
    color: #0b0c10;
  }
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
  color: inherit;
`;

export default function Home(props: RouteComponentProps) {
  return (
    <Container>
      <CategoryItems>
        <StyledLink to="/seurat">
          <CategoryItem>
            <div>SEURAT</div>
            <Icon>
              <SportsClub />
            </Icon>
          </CategoryItem>
        </StyledLink>
        <StyledLink to="/joukkueet">
          <CategoryItem>
            <Icon>
              <Users />
            </Icon>
            <div>JOUKKUEET</div>
          </CategoryItem>
        </StyledLink>
        <StyledLink to="/sarjat">
          <CategoryItem>
            <div>SARJAT</div>
            <Icon>
              <Trophy />
            </Icon>
          </CategoryItem>
        </StyledLink>
      </CategoryItems>
    </Container>
  );
}
