import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import MenuIcon from '@material-ui/icons/Menu';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useSelector} from "react-redux";
import {RootStateType} from "../main/bll/store";

const Settings = () => {

    const cities = useSelector<RootStateType, Array<string>>(state => state.weather.cities)


    return (
        <div>
            <div className="title">
                <p>Settings</p>
                <ClearIcon/>
            </div>
            <div>
                <MenuIcon/>
                <p>{cities}</p>
                <HighlightOffIcon/>
            </div>
        </div>
    );
};

export default Settings;