export const setCacheKey = (key: string, content: []): void => {
  window.localStorage.setItem(key, JSON.stringify(content));
};

export const cacheKeyExists = (key: string): boolean => {
  return window.localStorage.getItem(key) !== null;
};

export const getCacheKey = (key: string): [] => {
  return JSON.parse(window.localStorage.getItem(key) || '');
};
