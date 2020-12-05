import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import './App.css';

import { RootState } from './store';
import Search from './components/Search';
import Weather from './components/Weather';

const App: FC = () => {
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const loading = useSelector((state: RootState) => state.weather.loading);

  return (
    <main role="main" className="container">
      <Search title="Weather demo" subtitle="Enter city name & choose unit. Press search show weather info" />
        {loading ? <h2 className="is-size-3 py-2">Loading...</h2> : weatherData && <Weather data={weatherData} />}
    </main>
  );
}

export default App;
