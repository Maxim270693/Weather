import React, {ChangeEvent, KeyboardEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getWeatherTC, setErrorAC, setSettingsAC} from "../main/bll/reducers/weatherReducer";
import {Button} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import {RootStateType} from "../main/bll/store";

type PropsType = {
    city: string
    setCity: (city: string) => void
    setIsFirst: (isFirst: boolean) => void
}

const SearchWeather: React.FC<PropsType> = (props) => {


    const error = useSelector<RootStateType, string>(state => state.weather.error)
    const settings = useSelector<RootStateType, boolean>(state => state.weather.settings)
    const dispatch = useDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.setCity(e.currentTarget.value)


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        dispatch(setErrorAC(''))
        if (e.code === "Enter") {
            dispatch(getWeatherTC(props.city))
            props.setIsFirst(false)
        }
    }

    const onClickHandler = () => {
        dispatch(getWeatherTC(props.city))
        props.setIsFirst(false)
    }

    const openSettings = () => {
        dispatch(setSettingsAC(true))
    }

    return (
        <div>
            <div className='settings_icon'>
                <SettingsOutlinedIcon onClick={openSettings}/>
            </div>
            <div className='wrapper__search'>
                <input type="text"
                       className='search_input'
                       placeholder='Search City'
                       name={props.city}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <Button className='btn_search'
                        onClick={onClickHandler}
                >
                    <SendIcon/>
                </Button>
                {error && <div className='error_message'>Enter city please</div>}
            </div>
        </div>
    );
};

export default SearchWeather;