import { QueryParams } from '../interfaces/interface';

export const generateQueryString = (query:QueryParams[] = []) => {
  if (query.length) {
    return `?${query.map((x) => `${x.key}=${x.value}`).join('&')}`;
  }
  return '';
};

export const randomHexColorCode = () => {
  const n = (Math.random() * 0xfffff * 1000000).toString(16);
  return `#${n.slice(0, 6)}`;
};
