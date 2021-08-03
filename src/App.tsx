import React from 'react';
import './App.css';
import Weather from "./components/Weather";
import SearchWeather from "./components/SearchWeather";

function App() {
    return (
        <div className="App">
            <SearchWeather/>
            <Weather/>
        </div>
    );
}


export default App;
