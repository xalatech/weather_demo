import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import weatherQuery from '../../service/query';
import { WeatherAction, GET_WEATHER, SET_LOADING, SET_ERROR, WeatherDataResult, Unit, REMOVE_WEATHER } from '../types';

export const getWeather = (city: string, unit: Unit): ThunkAction<void, RootState, null, WeatherAction> => {
  return async (dispatch, getstate) => {
    try {

      // check if city exists in the state, first remove and update with new WeatherData
      const state = getstate();
      const { data } = state.weather;
      
      const cityExists = data.some(weather => weather.data.getCityByName.name.toLocaleLowerCase() === city.toLowerCase());
      if(cityExists) dispatch(removeWeather(city));
      
      // Load weather data from graphql server
      const endpoint = 'https://graphql-weather-api.herokuapp.com/'
      const query = weatherQuery(city, unit);
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({query: query})
      }).then(response => response.json())
      
      if(!res || !res.data.getCityByName) {
        throw new Error("Invalid city name.");
      }

      const resData: WeatherDataResult = await res;
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

export const removeWeather = (city: string): WeatherAction => {
  return {
    type: REMOVE_WEATHER,
    payload: city
  }
}

export const setLoading = (): WeatherAction => {
  return {
    type: SET_LOADING
  }
}

export const setError = (message: string): WeatherAction => {
  return {
    type: SET_ERROR,
    payload: message
  }
}