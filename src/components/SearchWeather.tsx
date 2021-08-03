import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {getWeatherTC} from "../main/bll/reducers/weatherReducer";

const SearchWeather:React.FC = () => {

    const dispatch = useDispatch()

    const [city, setCity] = useState('Minsk')


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setCity(e.currentTarget.value)

    const onClickHandler = () => {
        dispatch(getWeatherTC(city))
    }

    return (
        <div>
            <div className='wrapper__search'>
                <input type="text"
                       className='search_input'
                       placeholder='SearchWeather City'
                       name={city}
                       onChange={onChangeHandler}
                />
                <button onClick={onClickHandler}>search
                </button>
            </div>
        </div>
    );
};

export default SearchWeather;