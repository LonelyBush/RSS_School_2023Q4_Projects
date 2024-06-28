import {
  InputCars, InputWinner, QueryParams, UpdateWinner,
} from '../interfaces/interface';
import { ApiRequest } from './api_request';

export class ApiClient extends ApiRequest {
  constructor() {
    super({ srcURL: 'http://localhost:3000/' });
  }

  getCars = async (queryParams: QueryParams[]) => {
    const cars = await this.fetchJSON('garage', queryParams);
    return cars;
  };

  getWinners = async (queryParams: QueryParams[]) => {
    const winners = await this.fetchJSON('winners', queryParams);
    return winners;
  };

  getWinner = async (id: number) => {
    const car = await this.get(`winners/${id}`);
    return car;
  };

  createWinner = async (body: InputWinner) => {
    const send = await this.post('winners', body, {
      headers: { 'Content-Type': 'application/json' },
    });
    return send;
  };

  updateWinner = async (id: number, body: UpdateWinner) => {
    const send = await this.put(`winners/${id}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
    return send;
  };

  deleteWinner = async (id: number) => {
    const car = await this.delete(`winners/${id}`);
    return car;
  };

  getCar = async (id: number) => {
    const car = await this.get(`garage/${id}`);
    return car;
  };

  deleteCar = async (id: number) => {
    const car = await this.delete(`garage/${id}`);
    return car;
  };

  createCar = async (body: InputCars) => {
    const send = await this.post('garage', body, {
      headers: { 'Content-Type': 'application/json' },
    });
    return send;
  };

  updateCar = async (id: number, body: InputCars) => {
    const send = await this.put(`garage/${id}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
    return send;
  };

  startEngine = async (queryParams: QueryParams[]) => {
    const send = await this.patch('engine', queryParams);
    return send;
  };

  drive = async (queryParams: QueryParams[]) => {
    const send = await this.patch('engine', queryParams);
    return send;
  };
}
