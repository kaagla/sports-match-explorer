import styled from 'styled-components';
import { Link } from '@reach/router';

export const ListUL = styled.ul`
  width: 300px;
  list-style: none;
  margin: 0;
  margin-top: 20px;
  padding: 0;
`;

export const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: inherit;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const ListItem = styled.li`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  letter-spacing: 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;

  :nth-of-type(even) {
    background-color: black;
  }

  :hover {
    background-color: #1f2833;
    box-shadow: 0 10px 6px -6px #777;
  }
`;

export const ItemTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemName = styled.span``;

export const ItemDetails = styled.span``;

export const ItemIcon = styled.div`
  height: 30px;
  width: 30px;
  color: inherit;
`;

export const MoreItemsIcon = styled(ItemIcon)`
  width: 100%;
  display: flex;
  justify-content: center;
`;
