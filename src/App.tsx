import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';
import Category from './pages/Category';
import Details from './pages/Details';
import Home from './pages/Home';
import { handleCache } from './services/cacheService';

const Container = styled.div`
  margin: 0;
  height: 100%;
  width: 100%;
`;

export default function App() {
  useEffect(() => {
    handleCache();
  }, []);

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
        <Category
          path="/ottelupaikat"
          category="venues"
          title="Ottelupaikat"
          idPath="ottelupaikat"
        />
        <Details path="/ottelupaikat/:id" id="ID" category="locations" />
      </Router>
    </Container>
  );
}
