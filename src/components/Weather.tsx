import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../main/bll/store";
import {WeatherDataType} from "../main/dal/API";
import SearchWeather from "./SearchWeather";
import {Paper} from "@material-ui/core";
import {getWeatherCurrentTC, setSettingsAC} from '../main/bll/reducers/weatherReducer';
import Settings from "./Settings";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";


const Weather = () => {

    const data = useSelector<RootStateType, WeatherDataType | null>(state => state.weather.data)
    const settings = useSelector<RootStateType, boolean>(state => state.weather.settings)
    const dispatch = useDispatch()

    const [city, setCity] = useState('')
    const [isFirst, setIsFirst] = useState(true)

    const openSettings = () => {
        dispatch(setSettingsAC(true))
    }

    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = Promise.resolve(position.coords.latitude)
                const long = Promise.resolve(position.coords.longitude)
                Promise.all([lat, long]).then((res) => {
                    dispatch(getWeatherCurrentTC(res[0], res[1], '430f4135c55d99ceee29921a087daf36'))
                })
            });
        }
        fetchData();
    }, [])

    if (!data) {
        return <div>loading...</div>
    }


    return (
        <div className='search_weather'>
            <Paper className='paper'>
                {settings ? <>
                        <Settings/>
                        <SearchWeather city={city} setCity={setCity} setIsFirst={setIsFirst} id={data.id}/>
                    </> :


                    <div>
                        <div className='settings_icon'>
                            <SettingsOutlinedIcon onClick={openSettings}/>
                        </div>
                        <div className="weather">
                            <div>
                                <h1>{data.name}</h1>
                            </div>
                            <div className="welement">
                                {<span
                                    className='weather__temp'>{Math.floor(isFirst ? data.main.temp : data.main.temp - 273.15)} °C</span>}
                                <img className='weather__img'
                                     src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                                     alt="photo icon"/>
                                {data.weather[0].main}
                            </div>
                            <div className="welement">
                                Weather : {data.weather[0].description}
                            </div>
                            <div className="welement">
                                Humidity : {data.main.humidity} %
                            </div>
                            <div className="welement">
                                Wind speed : {data.wind.speed}
                            </div>
                            <div className="welement">
                                <p>Sunrise time
                                    : {new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                                <p>Sunset time
                                    : {new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                            </div>
                        </div>
                    </div>

                }
            </Paper>
        </div>
    );
};

export default Weather;