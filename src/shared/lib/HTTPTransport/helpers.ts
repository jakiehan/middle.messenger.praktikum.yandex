import type { Options } from './HTTPTransport';

const queryStringify = (data: Options['params']) => {
  if (!data) return '';

  const keys = Object.keys(data);

  return keys.reduce((acc, item) => {
    const isLastElem = data[item] === data[keys[keys.length - 1]];
    const value = !Array.isArray(data[item])
      ? String(data[item])
      : data[item].join(',');

    return (acc += `${item}=${value}${!isLastElem ? '&' : ''}`);
  }, '?');
};

const fetchWithRetry = (url: string, options: Options): Promise<Response> => {
  const { tries = 1 } = options;

  function onError(err: PromiseRejectedResult) {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }

    return fetchWithRetry(url, { ...options, tries: triesLeft });
  }

  return fetch(url, options).catch(onError);
};

export { queryStringify, fetchWithRetry };
