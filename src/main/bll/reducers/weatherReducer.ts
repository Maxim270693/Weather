import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "../store";
import {API, WeatherDataType} from "../../dal/API";

const GET_WEATHER = 'GET_WEATHER'
const SET_ERROR = 'SET_ERROR'

type InitialStateType = {
    data: WeatherDataType | null
    loading: boolean
    error: string
}

const initialState: InitialStateType = {
    data: null,
    loading: false,
    error: ''
}

export const weatherReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case GET_WEATHER:
            return {...state, data: action.data, loading: action.loading}
        case SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}


// ActionCreators
const getWeatherAC = (data: WeatherDataType, loading: boolean) => ({type: GET_WEATHER, data, loading} as const)
const setErrorAC = (error: string) => ({type: SET_ERROR, error} as const)

// ThunkCreators
export const getWeatherTC = (city: string) => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionType>) => {
    try {
        const response = await API.getWeather(city)
        dispatch(getWeatherAC(response.data, false))
    } catch (error) {
        dispatch(setErrorAC('error message'))
    }
}


type GetWeatherType = ReturnType<typeof getWeatherAC>
type SetErrorType = ReturnType<typeof setErrorAC>


type ActionType = GetWeatherType | SetErrorType