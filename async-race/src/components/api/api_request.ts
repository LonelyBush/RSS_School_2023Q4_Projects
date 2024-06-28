import {
  InputCars, QueryParams, InputWinner, UpdateWinner,
} from '../interfaces/interface';
import { generateQueryString } from '../utils/utils';

export class ApiRequest {
  protected srcURL: string = 'http://localhost:3000/';

  constructor({ srcURL = '' }) {
    this.srcURL = srcURL;
  }

  async fetchJSON(
    endpoint: string,
    queryParams?: QueryParams[],
    options = {},
  ) {
    const convertQuery = generateQueryString(queryParams);
    const response = await fetch(this.srcURL + endpoint + convertQuery, {
      ...options,
    });
    const count = Number(response.headers.get('X-Total-Count'));
    if (count !== 0) {
      const data = await response.json();
      return { count, data };
    }
    return response.json();
  }

  async get(endpoint: string, options = {}) {
    return this.fetchJSON(endpoint, undefined, {
      ...options,
      method: 'GET',
    });
  }

  async delete(endpoint: string, options = {}) {
    return this.fetchJSON(endpoint, undefined, {
      ...options,
      method: 'DELETE',
    });
  }

  post(endpoint: string, body: InputCars | InputWinner, options = {}) {
    return this.fetchJSON(endpoint, undefined, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
      method: 'POST',
    });
  }

  put(endpoint: string, body: InputCars | UpdateWinner, options = {}) {
    return this.fetchJSON(endpoint, undefined, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
      method: 'PUT',
    });
  }

  patch(endpoint:string, queryString: QueryParams[], options = {}) {
    return this.fetchJSON(endpoint, queryString, {
      ...options,
      method: 'PATCH',
    });
  }
}
