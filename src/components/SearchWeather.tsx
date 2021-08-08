import React, {ChangeEvent, KeyboardEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getWeatherTC, setCityAC, setErrorAC, setSettingsAC} from "../main/bll/reducers/weatherReducer";
import {Button} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send'
import {RootStateType} from "../main/bll/store";

type PropsType = {
    id : number
    city: string
    setCity: (city: string) => void
    setIsFirst: (isFirst: boolean) => void
}

const SearchWeather: React.FC<PropsType> = React.memo((props) => {

    const error = useSelector<RootStateType, string>(state => state.weather.error)
    const dispatch = useDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.setCity(e.currentTarget.value)

    const foo = () => {
        dispatch(getWeatherTC(props.city))
        dispatch(setSettingsAC(false))
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        dispatch(setErrorAC(''))
        if (e.code === "Enter") {
            foo()
            props.setIsFirst(false)
        }
    }

    const onClickHandler = (id: number, title: string) => {
        foo()
        props.setIsFirst(false)
        dispatch(setCityAC({id,title}))
    }

    return (
        <div>
            <div className='wrapper__search'>
                <input type="text"
                       className='search_input'
                       placeholder='Search City'
                       name={props.city}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <Button className='btn_search'
                        onClick={() => onClickHandler(props.id,props.city)}
                >
                    <SendIcon/>
                </Button>
                {error && <div className='error_message'>Enter city please</div>}
            </div>
        </div>
    );
});

export default SearchWeather;