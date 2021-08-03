import React from 'react';
import {useSelector} from "react-redux";
import {RootStateType} from "../main/bll/store";
import {WeatherDataType} from "../main/dal/API";
import SearchWeather from "./SearchWeather";
import {Paper} from "@material-ui/core";

const Weather: React.FC = () => {

    const data = useSelector<RootStateType, WeatherDataType | null>(state => state.weather.data)

    let sunset_date

    if(data !== null) {
        const sunset = data.sys.sunset
        const date = new Date()
        date.setTime(sunset)
        sunset_date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }

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
                                Pressure : {data.main.pressure} mb
                            </div>
                            <div>
                                Wind speed : {data.wind.speed}
                            </div>
                            <div>
                                Sunrise time : {data.sys.sunrise}
                                Sunset time : {sunset_date}
                            </div>
                        </div>
                    </div>
                </>}
            </Paper>
        </div>
    );
};

export default Weather;