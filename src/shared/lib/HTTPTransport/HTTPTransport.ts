import { queryStringify } from '@/shared/lib/HTTPTransport/helpers';

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
} as const;

type Methods = (typeof METHODS)[keyof typeof METHODS];

export type Options = {
  headers?: {
    name: string;
    value: string;
  };
  method?: Methods;
  timeout?: number;
  data?: Document | XMLHttpRequestBodyInit | null;
  params?: Record<string, string>;
  tries?: number;
};

export class HTTPTransport {
  get = (url: string, options: Options) => {
    const transformData = queryStringify(options?.params);
    const urlQuery = url + transformData;

    return this.request(
      urlQuery,
      { ...options, method: METHODS.GET },
      options?.timeout
    );
  };

  post = (url: string, options: Options) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options?.timeout
    );
  };

  put = (url: string, options: Options) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options?.timeout
    );
  };

  delete = (url: string, options: Options) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options?.timeout
    );
  };

  request = (url: string, options: Options, timeout = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method ?? METHODS.GET, url);

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          console.log(`${key}: ${value}`);
          xhr.setRequestHeader(`${key}`, `${value}`);
        }
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
