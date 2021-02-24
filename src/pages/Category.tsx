import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import Searchfield from './utils/Searchfield';
import {
  ListUL,
  ListItem,
  ItemTitle,
  ItemName,
  ItemDetails,
  ItemIcon,
  StyledLink,
  MoreItemsIcon,
} from './utils/ListComponents';
import Header from './utils/Header';
import {
  ArrowheadRightOutline,
  ArrowheadDownOutline,
} from '@styled-icons/evaicons-outline';
import { useData, DataProps } from '../services/useData';

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

interface Category {
  id: string;
  name: string;
  league?: string;
  sport: string;
}

interface CategoryProps extends RouteComponentProps {
  category: string;
  title: string;
  idPath: string;
}

export default function Category(props: CategoryProps) {
  const dataProps: DataProps = { category: props.category };
  const [dataItems, loading, error] = useData(dataProps);
  const [text, setText] = useState(history.state.text || '');
  const [numItems, setNumItems] = useState(history.state.numItems || 10);

  const filteredItems = (items: Category[]) => {
    if (items.length > 0 && items[0].league) {
      return items.filter(
        (item: Category) =>
          text
            .split(' ')
            .every((i: string) =>
              (item.name + ' ' + item.league + ' ' + item.sport)
                .toLowerCase()
                .includes(i.toLowerCase())
            ) &&
          item.name !== '' &&
          isNaN(parseInt(item.name.split('/')[0], 10))
      );
    }
    return items.filter(
      (item: Category) =>
        text
          .split(' ')
          .every((i: string) =>
            (item.name + ' ' + item.sport)
              .toLowerCase()
              .includes(i.toLowerCase())
          ) &&
        item.name !== '' &&
        isNaN(parseInt(item.name.split('/')[0], 10))
    );
  };

  function handleText(t: string) {
    setText(t);
    handleNumItems(10);
    const currState = history.state;
    history.replaceState(Object.assign(currState, { text: t }), 'text');
  }

  function handleNumItems(n: number) {
    setNumItems(n);
    const currState = history.state;
    history.replaceState(Object.assign(currState, { numItems: n }), 'numItems');
  }

  function handleScrollPos(pos: number) {
    const currState = history.state;
    history.replaceState(
      Object.assign(currState, { scrollPos: pos }),
      'scrollPos'
    );
  }

  useEffect(() => {
    setTimeout(() => {
      document.documentElement.scrollTop = document.body.scrollTop =
        history.state.scrollPos || 0;
    }, 100);
  }, []);

  return (
    <Container>
      <Header title={props.title} />
      <Searchfield
        text={text}
        handleTextChange={handleText}
        category={props.category}
      />
      {loading && <div>Ladataan...</div>}
      <ListUL>
        {filteredItems(dataItems)
          .slice(0, numItems)
          .map((item: Category) => (
            <StyledLink
              onClick={() => handleScrollPos(window.scrollY)}
              key={item.id}
              to={`/${props.idPath}/${item.id}`}
            >
              <ListItem key={item.id} selected={false}>
                <ItemTitle>
                  <ItemName>{item.name}</ItemName>
                  {item.league && <ItemDetails>{item.league}</ItemDetails>}
                  <ItemDetails>{item.sport}</ItemDetails>
                </ItemTitle>
                <ItemIcon>
                  <ArrowheadRightOutline />
                </ItemIcon>
              </ListItem>
            </StyledLink>
          ))}
        {filteredItems(dataItems).length > numItems && (
          <ListItem
            key="more-items"
            selected={false}
            onClick={() => handleNumItems(numItems + 20)}
          >
            <MoreItemsIcon>
              <ArrowheadDownOutline />
            </MoreItemsIcon>
          </ListItem>
        )}
      </ListUL>
    </Container>
  );
}
