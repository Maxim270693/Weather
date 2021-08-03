import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {getWeatherTC} from "../main/bll/reducers/weatherReducer";
import {Button} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send'

const SearchWeather: React.FC = () => {

    const dispatch = useDispatch()

    const [city, setCity] = useState('Minsk')


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setCity(e.currentTarget.value)

    const onClickHandler = () => {
        dispatch(getWeatherTC(city))
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.code === "Enter") {
            dispatch(getWeatherTC(city))
        }
    }

    return (
        <div>
            <div className='wrapper__search'>
                <input type="text"
                       className='search_input'
                       placeholder='Search City'
                       name={city}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <Button className='btn_search'
                        onClick={onClickHandler}
                >
                    <SendIcon/>
                </Button>
            </div>
        </div>
    );
};

export default SearchWeather;