import React, { FC } from 'react';
import { Unit, WeatherData, WeatherDataResult } from '../store/types';
import '../styles/weather.css';
import moment from 'moment';

interface WeatherProps {
  data: WeatherDataResult;
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
  const weatherData: WeatherData = data.data.getCityByName;
  const today = new Date;

  // Destructure weather details from WeatherData
  const { weather } = weatherData;
  const { temperature } = weather;
  const { summary } = weather;
  const { wind } = weather;
  const { clouds } = weather;

  return (
    <div className="weather__container card">
      <div className="card-body">
        <div className="d-flex">
          <div className="weather__summary__container">
            <div className="weather__date__location">
              <h3>{weatherData.name}, {weatherData.country}</h3>
              <p className="text-gray">
                <span className="weather__date">
                  {moment(today).format("dddd")}
                  {moment(today).format("DD MMM, yyyy")}
                </span></p>
            </div>
            <div className="weather__data d-flex">
              <div className="mr-auto">
                <h4 className="display-3">
                  {Math.round(temperature.actual)} 
                  <span className="symbol">°</span>
                  {measurement(data.unit)} </h4>
              </div>
            </div>
            <p>
              <span className="font-weight-bold">{summary.title}</span>
              <span> - {summary.description}</span>
            </p>
          </div>
          <div className="weather__other__info ml-auto mr-5">
            <h5 className="mb-3">
              <span className="font-weight-bold">Low: </span>
              {Math.round(temperature.min)}° {measurement(data.unit)}
            </h5>
            <h5 className="mb-3">
              <span className="font-weight-bold">High: </span>
              {Math.round(temperature.max)}° {measurement(data.unit)}
            </h5>
            <h5 className="mb-3">
              <span className="font-weight-bold">Wind: </span>
              {wind.speed} m/s - {wind.deg}°
            </h5>
            <h5 className="mb-3">
              <span className="font-weight-bold">Humidity: </span>
              {clouds.humidity}%
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;