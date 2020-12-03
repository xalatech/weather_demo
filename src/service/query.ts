import { gql } from 'graphql-request'
import { Unit } from '../store/types';

const weatherQuery = (cityName: string, unit: Unit) => {
    return gql`
     { getCityByName(name: "${cityName}" , config: { units: ${Unit[unit]} }) {
        name
        country
        weather {
            temperature {
                actual
                feelsLike
                min
                max
            }
            summary {
                title
                description
            }
            wind {
                speed
                deg
            }
            clouds {
                all
                visibility
                humidity
            }
    }
}
}
`
};

export default weatherQuery;