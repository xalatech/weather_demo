import { FC, useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from './Alert';

import { getWeather, setError, setLoading } from '../store/actions/weatherActions';
import { Unit } from '../store/types';
import { RootState } from '../store';

interface SearchProps {
  title: string;
  subtitle: string;
}

const Search: FC<SearchProps> = ({ title, subtitle }) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState(Unit.metric);
  const error = useSelector((state: RootState) => state.weather.error);

  // Make sure city input is always focussed
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    inputRef.current.focus();
  });

  const changeCityHandler = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  }

  const handleResetError = (e: FormEvent<HTMLInputElement>) => {
    if(error) dispatch(setError(''))
  }

  const changeUnitHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setUnit(parseInt(e.currentTarget.value));
  };

  const resetSearchForm = () => {
    setCity('');
    setUnit(0);

    inputRef.current.focus();
  }

  const dispatchWeatherActions = () => {
    // dispatch actions
    dispatch(setError(''))
    dispatch(setLoading());
    dispatch(getWeather(city, unit));
    resetSearchForm();
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (city.trim() === '') {
      return dispatch(setError('City is required!'));
    }

    dispatchWeatherActions();
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
                <input
                  type="text"
                  ref={inputRef}
                  className="form-control" 
                  id="city"
                  placeholder="e.g. Paris, Oslo, London"
                  value={city}
                  onKeyDown={handleResetError}
                  onChange={changeCityHandler} />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="unit">Choose unit</label>
                <select id="unit" onChange={changeUnitHandler} value={unit} className="form-control">
                {Object.keys(Unit).filter(k => typeof Unit[k as any] === "number").map((key, i) => (
                    <option key={i} value={i}>
                      {Unit[i]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" disabled={!city} className="btn btn-primary col-md-5 mt-2 mb-0">Search</button>
          </form>
          {error && <Alert message={error} />}
        </div>
      </div>
  );
}

export default Search;