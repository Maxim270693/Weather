import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getWeatherTC, setErrorAC} from "../main/bll/reducers/weatherReducer";
import {Button} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import {RootStateType} from "../main/bll/store";


const SearchWeather: React.FC = () => {

    const error = useSelector<RootStateType, string>(state => state.weather.error)
    const dispatch = useDispatch()

    const [city, setCity] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setCity(e.currentTarget.value)

    const onClickHandler = () => {
        dispatch(getWeatherTC(city))
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        dispatch(setErrorAC(''))
        if (e.code === "Enter") {
            dispatch(getWeatherTC(city))
        }
    }

    return (
        <div>
            <div className='settings_icon'>
                <SettingsOutlinedIcon onClick={() => alert('Hi')}/>
            </div>
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
                {error && <div className='error_message'>Enter city please</div>}
            </div>
        </div>
    );
};

export default SearchWeather;