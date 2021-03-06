import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "../store";
import {API, WeatherDataType} from "../../dal/API";

const GET_WEATHER = 'GET_WEATHER'
const SET_ERROR = 'SET_ERROR'
const SET_CITY = 'SET_CITY'
const SET_SETTINGS = 'SET_SETTINGS'
const DELETE_CITY = 'DELETE_CITY'
const REPLACE_CITY = 'REPLACE_CITY'

export type CityType = {
    id: number
    title: string
}

type InitialStateType = {
    data: WeatherDataType | null
    error: string,
    settings: boolean
    cities: Array<CityType>
}

const initialState: InitialStateType = {
    data: null,
    error: '',
    settings: false,
    cities: []
}

export const weatherReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case GET_WEATHER:
            return {...state, data: action.data}
        case SET_ERROR:
            return {...state, error: action.error}
        case SET_SETTINGS:
            return {...state, settings: action.settings}
        case SET_CITY:
            return {...state, cities: [...state.cities, action.city]}
        case DELETE_CITY:
            return {...state, cities: state.cities.filter((city) => city.id !== action.id)}
        case REPLACE_CITY:
            return {
                ...state, cities: state.cities.map(c => {
                    if (c.title === action.city1.title) {
                        return action.city2
                    }
                    if (c.title === action.city2.title) {
                        return action.city1
                    }
                    return c
                })
            }
        default:
            return state
    }
}


// ActionCreators
export const getWeatherAC = (data: WeatherDataType) => ({type: GET_WEATHER, data} as const)
export const setErrorAC = (error: string) => ({type: SET_ERROR, error} as const)
export const setCityAC = (city: CityType) => ({type: SET_CITY, city} as const)
export const setSettingsAC = (settings: boolean) => ({type: SET_SETTINGS, settings} as const)
export const deleteCityAC = (id: number) => ({type: DELETE_CITY, id} as const)
export const replaceCityAC = (city1: CityType, city2: CityType) => ({type: REPLACE_CITY, city1, city2} as const)

// ThunkCreators
export const getWeatherTC = (city: string) => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionType>) => {
    try {
        const response = await API.getWeather(city)
        dispatch(getWeatherAC(response.data))
    } catch (error) {
        dispatch(setErrorAC(error.message))
    }
}
export const getWeatherCurrentTC = (lat: number, long: number, api: string) => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionType>) => {
    try {
        const response = await API.getLocation(lat, long, api)
        dispatch(getWeatherAC(response))
    } catch (error) {
        dispatch(setErrorAC(error.message))
    }
}


type GetWeatherType = ReturnType<typeof getWeatherAC>
type SetErrorType = ReturnType<typeof setErrorAC>
type SetCityType = ReturnType<typeof setCityAC>
type SetSettingsType = ReturnType<typeof setSettingsAC>
type DeleteCityType = ReturnType<typeof deleteCityAC>
type ReplaceCityType = ReturnType<typeof replaceCityAC>


type ActionType = GetWeatherType | SetErrorType | SetCityType | SetSettingsType | DeleteCityType | ReplaceCityType