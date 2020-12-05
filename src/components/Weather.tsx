import React, { FC } from 'react';
import { WeatherDataResult } from '../store/types';

import '../styles/weather.css';
import WeatherItem from './weather.item';

interface WeatherProps {
  data: WeatherDataResult[];
}

const Weather: FC<WeatherProps> = ({ data }) => {
  const renderWeatherCards = data.map(w => {
    return <WeatherItem data={w} key={w.data.getCityByName.name} />
  })

  return <div>{renderWeatherCards}</div>
}

export default Weather;