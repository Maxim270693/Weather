import React from 'react';
import {useSelector} from "react-redux";
import {RootStateType} from "../main/bll/store";
import {WeatherDataType} from "../main/dal/API";
import SearchWeather from "./SearchWeather";
import {Paper} from "@material-ui/core";

const Weather: React.FC = () => {

    const data = useSelector<RootStateType, WeatherDataType | null>(state => state.weather.data)


    return (
        <div className='search_weather'>
            <Paper className='paper'>
                <SearchWeather/>
                {data && <>
                    <div>
                        <div className="weather">
                            <div>
                                <h1>{data.name}</h1>
                            </div>
                            <div className="welement">
                                <span className='weather__temp'>{Math.floor(data.main.temp - 273.15)} °C</span>
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
                                <p>Sunrise time : {new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                                <p>Sunset time : {new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                            </div>
                        </div>
                    </div>
                </>}
            </Paper>
        </div>
    );
};

export default Weather;