import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cacheKeyExists, getCacheKey, setCacheKey } from './cacheService';

export interface DataProps {
  category: string;
  id?: string;
  resource?: string;
}

export const useData = ({ category, id, resource }: DataProps) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function cacheKey() {
    if (id && resource) {
      if (resource === 'info') {
        return `${id}_info`;
      }
      return `${id}_${resource}`;
    } else {
      return category;
    }
  }

  function fetchUrl() {
    if (id && resource) {
      if (resource === 'info') {
        return `${process.env.REACT_APP_API_URL}${category}/${id}/`;
      }
      return `${process.env.REACT_APP_API_URL}${category}/${id}/${resource}`;
    } else {
      return `${process.env.REACT_APP_API_URL}${category}`;
    }
  }

  useEffect(() => {
    if (items.length === 0) {
      if (cacheKeyExists(cacheKey())) {
        setItems(getCacheKey(cacheKey()));
        setLoading(false);
      } else {
        axios
          .get(fetchUrl())
          .then((res) => {
            setCacheKey(cacheKey(), res.data);
            setItems(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
          });
      }
    } else {
      setLoading(false);
    }
  }, []);

  return [items, loading, error] as const;
};
