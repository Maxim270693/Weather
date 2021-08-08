import React, {useState} from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import MenuIcon from '@material-ui/icons/Menu';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../main/bll/store";
import {CityType, deleteCityAC, replaceCityAC, setSettingsAC} from "../main/bll/reducers/weatherReducer";

const Settings = () => {

    const cities = useSelector<RootStateType, Array<CityType>>(state => state.weather.cities)
    const dispatch = useDispatch()

    const [currentCity, setCurrentCity] = useState<any>(null)

    const onClickHandler = () => dispatch(setSettingsAC(false))

    const removeCity = (id: number) => {
        dispatch(deleteCityAC(id))
    }

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, city: CityType) => {
        setCurrentCity(city)
    }

    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {

    }

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const dropHandler = (e: React.DragEvent<HTMLDivElement>, city: CityType) => {
        e.preventDefault()
        dispatch(replaceCityAC(city, currentCity))
    }

    return (
        <div className='wrapper_settings'>
            <div className="title">
                <p>Settings</p>
                <ClearIcon className='clear_icon' onClick={onClickHandler}/>
            </div>
            {

                cities.map(city =>
                    <div className='menu'
                         key={city.id}
                         draggable={true}
                         onDragStart={(e) => dragStartHandler(e, city)}
                         onDragLeave={(e) => dragEndHandler(e)}
                         onDragEnd={(e) => dragEndHandler(e)}
                         onDragOver={(e) => dragOverHandler(e)}
                         onDrop={(e) => dropHandler(e, city)}
                    >
                        <MenuIcon/>
                        <p>{city.title}</p>
                        <HighlightOffIcon className='delete_icon' onClick={() => removeCity(city.id)}/>
                    </div>)
            }
        </div>
    );
};

export default Settings;