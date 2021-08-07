import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import MenuIcon from '@material-ui/icons/Menu';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../main/bll/store";
import {CityType, setSettingsAC} from "../main/bll/reducers/weatherReducer";

const Settings = () => {

    const cities = useSelector<RootStateType, Array<CityType>>(state => state.weather.cities)
    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(setSettingsAC(false))


    return (
        <div className='wrapper_settings'>
            <div className="title">
                <p>Settings</p>
                <ClearIcon className='clear_icon' onClick={onClickHandler}/>
            </div>
            {
                cities.map(city => <div className='menu' key={city.id}>
                    <MenuIcon/>
                    <p>{city.title}</p>
                    <HighlightOffIcon onClick={() => alert('delete')}/>
                </div>)
            }
        </div>
    );
};

export default Settings;