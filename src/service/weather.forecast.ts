import { Unit } from '../store/types';
import weatherQuery from './query';

const endpoint = 'https://graphql-weather-api.herokuapp.com/'

// TODO: this can be implemented for separation of concern

const weatherForecast = async (cityName: string) => {
    const query = weatherQuery(cityName, Unit.metric);

    try {
        return await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query })
        })

    } catch (error) {
        console.log(error);
    }

}

export default weatherForecast;