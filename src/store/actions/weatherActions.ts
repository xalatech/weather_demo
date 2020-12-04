import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import weatherQuery from '../../service/query';
import { WeatherAction, WeatherError, GET_WEATHER, SET_LOADING, SET_ERROR, WeatherDataResult, Unit } from '../types';

export const getWeather = (city: string, unit: Unit): ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {
    try {
      const endpoint = 'https://graphql-weather-api.herokuapp.com/'
      const query = weatherQuery(city, unit);
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({query: query})
      })
      
      if(!res.ok) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }

      const resData: WeatherDataResult = await res.json();
      resData.unit = unit;

      dispatch({
        type: GET_WEATHER,
        payload: resData
      });
    }catch(err) {
      dispatch({
        type: SET_ERROR,
        payload: err.message
      });
    }
  }
}

export const setLoading = (): WeatherAction => {
  return {
    type: SET_LOADING
  }
}

export const setError = (): WeatherAction => {
  return {
    type: SET_ERROR,
    payload: ''
  }
}