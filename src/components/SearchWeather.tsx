import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {getWeatherTC} from "../main/bll/reducers/weatherReducer";
import {Button} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';


type PositionType = {
    coords: {
        accuracy: null | number
        altitude: null | number
        altitudeAccuracy: null | number
        heading: null | number
        latitude: null | number
        longitude: null | number
        speed: null | number
    }
    timestamp: number
}

const SearchWeather: React.FC = () => {

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    const successCallback = (position: PositionType) => {
        const crd = position.coords;

        console.log('Ваше текущее местоположение:');
        console.log(`Широта: ${crd.latitude}`);
        console.log(`Долгота: ${crd.longitude}`);
        console.log(`Плюс-минус ${crd.accuracy} метров.`);
    }
    const errorCallback = (error: any) => {
        console.log(error)
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options )


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
            </div>
        </div>
    );
};

export default SearchWeather;