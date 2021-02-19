import React from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';
import Category from './pages/Category';
import Details from './pages/Details';
import Home from './pages/Home';

const Container = styled.div`
  margin: 0;
  height: 100%;
  width: 100%;
`;

export default function App() {
  return (
    <Container>
      <Router>
        <Home path="/" />
        <Category
          path="/joukkueet"
          category="teams"
          title="Joukkueet"
          idPath="joukkueet"
        />
        <Details path="/joukkueet/:id" id="ID" category="teams" />
        <Category
          path="/sarjat"
          category="leagues"
          title="Sarjat"
          idPath="sarjat"
        />
        <Details path="/sarjat/:id" id="ID" category="leagues" />
        <Category
          path="/seurat"
          category="clubs"
          title="Seurat"
          idPath="seurat"
        />
        <Details path="/seurat/:id" id="ID" category="clubs" />
      </Router>
    </Container>
  );
}
