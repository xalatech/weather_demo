import React, { FC } from 'react';
import { WeatherData, WeatherDataResult } from '../store/types';
import '../styles/weather.css';

interface WeatherProps {
  data: WeatherDataResult;
}

const Weather: FC<WeatherProps> = ({ data }) => {
  const weatherData: WeatherData = data.data.getCityByName;

  return (
    <section className="section">
      <div className="card">

        <h2>{weatherData.name}</h2>
        <h3>Cloudy<span>Wind 10km/h <span className="dot">•</span> Precip 0%</span></h3>
        <h1>23°</h1>
        <div className="sky">
          <div className="cold"></div>
          <div className="cloud">
            <div className="circle-small"></div>
            <div className="circle-tall"></div>
            <div className="circle-medium"></div>
          </div>
        </div>
        <table>
          <tr>
            <td>TUE</td>
            <td>WED</td>
            <td>THU</td>
            <td>FRI</td>
            <td>SAT</td>
          </tr>
          <tr>
            <td>30°</td>
            <td>34°</td>
            <td>36°</td>
            <td>34°</td>
            <td>37°</td>
          </tr>
          <tr>
            <td>17°</td>
            <td>22°</td>
            <td>19°</td>
            <td>23°</td>
            <td>19°</td>
          </tr>
        </table>
      </div>
    </section>
  );
}

export default Weather;