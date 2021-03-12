import axios from 'axios';

export const setCacheKey = (key: string, content: []): void => {
  window.localStorage.setItem(key, JSON.stringify(content));
};

export const cacheKeyExists = (key: string): boolean => {
  return window.localStorage.getItem(key) !== null;
};

export const getCacheKey = (key: string): [] | string => {
  return JSON.parse(window.localStorage.getItem(key) || '');
};

export const isCurrentDB = (value: string): boolean => {
  if (cacheKeyExists('cacheId')) {
    const cacheId = getCacheKey('cacheId');
    if (cacheId !== '' && cacheId === value) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

export const clearCache = () => {
  window.localStorage.clear();
};

export const handleCache = () => {
  axios.get(`${process.env.REACT_APP_API_URL}info/`).then((res) => {
    const cacheId = res.data.id;
    if (cacheKeyExists('cacheId')) {
      if (!isCurrentDB(cacheId)) {
        clearCache();
        setCacheKey('cacheId', res.data.id);
      }
    } else {
      clearCache();
      setCacheKey('cacheId', res.data.id);
    }
  });
};
