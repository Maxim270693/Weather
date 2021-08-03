import React from 'react';
import {useSelector} from "react-redux";
import {RootStateType} from "../main/bll/store";
import {WeatherDataType} from "../main/dal/API";

const Weather: React.FC = () => {

    const data = useSelector<RootStateType, WeatherDataType | null>(state => state.weather.data)

    return (
        <div>
            {data && <>
                <div>
                    <div className="Weather">
                        <div className="welement">
                            Main: {data.weather[0].main}
                        </div>
                        <div>
                            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt=""/>
                        </div>
                        <div>
                            temp: {Math.floor(data.main.temp - 273.15)}
                        </div>
                        <div className="welement">
                            Weather : {data.weather[0].description}
                        </div>
                        <div className="welement">
                            Humidity :{data.main.humidity} %
                        </div>
                        <div className="welement">
                            Pressure : {data.main.pressure} mb
                        </div>
                    </div>
                </div>
            </>}
        </div>
    );
};

export default Weather;