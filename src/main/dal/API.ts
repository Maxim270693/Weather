import axios from "axios";

const instance = axios.create({
    baseURL: "http://api.openweathermap.org/data/2.5/",
    params: {
        appid: '430f4135c55d99ceee29921a087daf36'
    }
})


export type WeatherDataType = {
    coord: {
        lon: number
        lat: number
    }
    weather: Array<WeatherType>
    base: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
    }
    visibility: number
    wind: {
        speed: number
        deg: number
    }
    clouds: {
        all: number
    }
    dt: number
    sys: {
        type: number
        id: number
        message: number
        country: string
        sunrise: number
        sunset: number
    },
    timezone: number
    id: number
    name: string
    cod: number
}

export type WeatherType = {
    id: number
    main: string
    description: string
    icon: string
}


export const API = {
    getWeather(city: string) {
        return instance.get<WeatherDataType>(`weather?q=${city}`)
    },
    getLocation(lat: number, long: number, api: string) {
        return axios.get(`http://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${api}`)
            .then((res) => {
                return res.data
            })

    },
    setLoading() {

    }
}