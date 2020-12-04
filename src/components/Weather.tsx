import { FC } from 'react';
import { Unit, WeatherData, WeatherDataResult } from '../store/types';
import { removeWeather, setLoading } from '../store/actions/weatherActions';

import '../styles/weather.css';
import moment from 'moment';
import { useDispatch } from 'react-redux';

interface WeatherProps {
  data: WeatherDataResult[];
}

const measurement = (unit: Unit) => {
  if (unit === Unit.metric) {
    return 'C';
  } else if (unit === Unit.imperial) {
    return 'F';
  } else {
    return 'K';
  }
}

const Weather: FC<WeatherProps> = ({ data }) => {
  const dispatch = useDispatch();

  const handleClose = (city: string) => {
    dispatch(setLoading());
    dispatch(removeWeather(city));
  }

  const renderWeatherCards = data.map(w => {
    const weatherData: WeatherData = w.data.getCityByName;
    const today = new Date();

    // Destructure weather details from WeatherData
    const { weather } = weatherData;
    const { temperature } = weather;
    const { summary } = weather;
    const { wind } = weather;
    const { clouds } = weather;

  return (
    <div hidden={!weatherData} className="weather__container card" key={weatherData.name}>
      <div className="card-body">
        <button 
          type="button" 
          onClick={() => handleClose(weatherData.name)}
          className="close weather__card__close__button" 
          aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="d-flex">
          <div className="weather__summary__container">
            <div className="weather__date__location">
              <h2>{weatherData.name}, {weatherData.country}</h2>
              <p className="text-gray">
                <span className="weather__date">
                  {moment(today).format("dddd DD MMM, yyyy")}
                </span></p>
            </div>
          </div>
          <div className="temperature__container ml-auto">
            <div className="weather__data d-flex">
                <div className="mr-auto">
                  <h4 className="display-1">
                    {Math.round(temperature.actual)} 
                    <span className="symbol">°</span>
                    {measurement(w.unit)} </h4>
                </div>
              </div>
              <p>
                <span className="font-weight-bold">{summary.title}</span>
                <span> - {summary.description}</span>
              </p>
          </div>
          <div className="weather__other__info ml-auto mr-2">
            <p className="mb-3">
              <span className="font-weight-bold">Low: </span>
              {Math.round(temperature.min)}° {measurement(w.unit)}
            </p>
            <p className="mb-3">
              <span className="font-weight-bold">High: </span>
              {Math.round(temperature.max)}° {measurement(w.unit)}
            </p>
            <p className="mb-3">
              <span className="font-weight-bold">Wind: </span>
              {wind.speed} m/s - {wind.deg}°
            </p>
            <p className="mb-3">
              <span className="font-weight-bold">Humidity: </span>
              {clouds.humidity}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})
return <div>{renderWeatherCards}</div>
}

export default Weather;