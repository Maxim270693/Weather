import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {weatherReducer} from "./reducers/weatherReducer";
import {loadState, saveState} from "../../utils/localStorage-utils";

const rootReducer = combineReducers({
    weather: weatherReducer
})

export const store = createStore(rootReducer, loadState(), applyMiddleware(thunk))

store.subscribe(() => {
    saveState({
        weather: store.getState().weather
    })
})


export type RootStateType = ReturnType<typeof rootReducer>