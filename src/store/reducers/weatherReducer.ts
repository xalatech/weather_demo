import { WeatherState, WeatherAction, GET_WEATHER, SET_LOADING, SET_ERROR, REMOVE_WEATHER } from "../types";

const initialState: WeatherState = {
  data: [],
  loading: false,
  error: ''
}

const WeatherReducer = (state = initialState, action: WeatherAction): WeatherState => {
  switch(action.type) {
    case GET_WEATHER:
      return {
        data: [action.payload, ...state.data],
        loading: false,
        error: ''
      }
    case REMOVE_WEATHER:
      return {
        ...state,
        data: state.data.filter(weather => weather.data.getCityByName.name.toLowerCase() !== action.payload.toLocaleLowerCase()),
        loading: false
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case SET_ERROR: 
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default: 
      return state;
  }
}

export default WeatherReducer;