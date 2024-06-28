export interface QueryParams {
  key: string;
  value: number | string;
}

export interface Options {
  method: string,
  headers: HeadersInit,
  body: BodyInit
}

export interface Cars {
  name: string;
  color: string;
  id: number;
}

export interface InputCars {
  name: string;
  color: string;
}

export interface InputWinner {
  id: number;
  wins: number;
  time: number;
}

export interface Data {
  count: number;
  data: Cars[];
}

export interface Winners {
  id: number;
  wins: number;
  time: number;
}

export interface WinData {
  count: number,
  data: Winners[]
}

export interface UpdateWinner {
  wins: number;
  time: number;
}
