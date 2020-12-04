import React, { FC } from 'react';
import { Unit, WeatherData, WeatherDataResult } from '../store/types';
import '../styles/weather.css';
import moment from 'moment'

interface WeatherProps {
    data: WeatherDataResult;
}

const measurement = (unit: Unit) => {
    if(unit === Unit.metric) {
        return 'C';
    }else if(unit === Unit.imperial) {
        return 'F';
    }else{
        return 'K';
    }
}

const Weather: FC<WeatherProps> = ({ data }) => {
    const weatherData: WeatherData = data.data.getCityByName;
    const today = new Date;

    return (
        <div className="row container d-flex justify-content-center">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card card__weather">
                    <div className="card-body">
                        <div className="weather__date__location">
                            <h3>{weatherData.name}, {weatherData.country}</h3>
                            <p className="text-gray"> <span className="weather-date">{moment(today).format("dddd")} {moment(today).format("DD MMM, yyyy")}</span> </p>
                        </div>
                        <div className="weather__data d-flex">
                            <div className="mr-auto">
                                <h4 className="display-3">{Math.round(weatherData.weather.temperature.actual)} <span className="symbol">°</span>{measurement(data.unit)} </h4>
                                <p> Cloudy </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;