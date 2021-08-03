import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "../store";
import {API, WeatherDataType} from "../../dal/API";

const GET_WEATHER = 'GET_WEATHER'

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
        default:
            return state
    }
}


// ActionCreators
const getWeatherAC = (data: WeatherDataType, loading: boolean) => ({type: GET_WEATHER, data, loading} as const)


// ThunkCreators
export const getWeatherTC = (city: string) => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionType>) => {
    try {
        const response = await API.getWeather(city)
        dispatch(getWeatherAC(response.data, false))
    } catch (error) {

    }
}


type GetWeatherType = ReturnType<typeof getWeatherAC>


type ActionType = GetWeatherType