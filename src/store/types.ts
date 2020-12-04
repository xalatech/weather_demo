export const GET_WEATHER = 'GET_WEATHER';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_ALERT = 'SET_ALERT';

export interface Weather {
  description: string;
  icon: string;
  id: number;
}

export interface WeatherData {
  name: string;
  country: string;
  weather: {
    temperature: {
      actual: number;
      feelsLike: number;
      min: number;
      max: number;
    },
    summary: {
      title: string;
      description: string;
    },
    wind: {
      speed: number;
      deg: number;
    },
    clouds: {
      all: number;
      visibility: number;
      humidity: number;
    }
  }
}

export interface WeatherDataResult {
  data: {
    getCityByName: WeatherData
  },
  unit: Unit;
}

export enum Unit {
  metric,
  imperial,
  kelvin
}

export interface WeatherError {
  data: {
    getCityByName: WeatherData
  }
  message: string;
}

export interface WeatherState {
  data: WeatherDataResult | null;
  loading: boolean;
  error: string;
}

interface GetWeatherAction {
  type: typeof GET_WEATHER;
  payload: WeatherDataResult;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export type WeatherAction = GetWeatherAction | SetLoadingAction | SetErrorAction;

export interface AlertAction {
  type: typeof SET_ALERT;
  payload: string;
}

export interface AlertState {
  message: string;
}