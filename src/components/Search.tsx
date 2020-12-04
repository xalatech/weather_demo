import { setegid } from 'process';
import { FC, useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { getWeather, setError, setLoading } from '../store/actions/weatherActions';
import { Unit } from '../store/types';

interface SearchProps {
  title: string;
  subtitle: string;
}

const Search: FC<SearchProps> = ({ title, subtitle }) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState(Unit.metric);


  const changeCityHandler = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  }

  const changeUnitHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setUnit(parseInt(e.target.value));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (city.trim() === '') {
      return dispatch(setError('City is required!'));
    }

    // dispatch actions
    dispatch(setError(''))
    dispatch(setLoading());
    dispatch(getWeather(city, unit));

    // Reset the Search form
    setCity('');
    setUnit(Unit.metric);
  }

  return (
      <div className="card weather__search__container">
        <div className="card-body">
          <h5 className="card-title text-uppercase">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
          <form className="py-3" onSubmit={submitHandler}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="city">City name</label>
                <input type="text"
                  className="form-control" id="city"
                  placeholder="e.g. Paris, Oslo, London"
                  value={city}
                  onChange={changeCityHandler} />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="unit">Choose unit</label>
                <select id="unit" onChange={changeUnitHandler} className="form-control">
                  {Object.keys(Unit).map((key, i) => (
                    <option key={key} value={key}>
                      {Unit[i]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary col-md-3 mt-2 mb-0">Search</button>
          </form>
        </div>
      </div>
  );
}

export default Search;