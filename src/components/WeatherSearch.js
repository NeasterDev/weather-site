import { useState } from "react"
import { CurrentWeatherCard } from "./CurrentWeatherCard";

export const WeatherSearch = () => {
    const API = "03c8e245a77af365bd5c0468aae6ab2a";
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    const [date, setDate] = useState("");
    const [currentTemp, setCurrentTemp] = useState("");
    const [forecastArray, setForcastArray] = useState([]);
    const [feelsLike, setFeelsLike] = useState("");

    const searchForLocation = (e) => {
        e.preventDefault();

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;
        if (state) {
            if (country) {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${API}`;
            }
        } else {
            if (country) {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API}`;
            }
        }
        // we use this fetch to find the lon/lat
        fetch(url)
        .then(data => data.json())
        .then(json => {
            // this fetch to find the weather forecast
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${json.coord.lat}&lon=${json.coord.lon}&units=imperial&appid=${API}`)
            .then(data => data.json())
            .then(json => {
                // weather forecast data here
                // get current weather data here
                console.log("Current Weather: ");
                console.log(json.current);
                // 8 day forecast here; 0 - 7, 0 is today
                console.log("8 Day Forecast weather: ");
                console.log(json.daily);

                // gets the current date from the unix format
                let date = new Date(json.current.dt * 1000);
                // sets the current date, temp, feels like, and daily forcast array
                setDate(date);
                setCurrentTemp(json.current.temp);
                setFeelsLike(json.current.feels_like);
                setForcastArray(json.daily);
            })
        });
    }

    return (
        <div className="search-form-container">
            <h1 className="form-title">Weather</h1>
            <form className='search-form' onSubmit={searchForLocation}>
                <div className="search-container">
                    <input className="search-box" placeholder="City" onChange={(e) => setCity(e.target.value)}/>
                    <input className="search-box" placeholder="State" onChange={(e) => setState(e.target.value.toLowerCase())}/>
                    <input className="search-box" placeholder="Country" onChange={(e) => setCountry(e.target.value.toLowerCase())}/>
                </div>
                <button className='btn-blue' type='submit'>Search</button>
            </form>
            {date ? <CurrentWeatherCard 
                        date={date} 
                        currentTemp={currentTemp}
                        feelsLike={feelsLike}
                        forecastArray={forecastArray}
                    /> 
            : null}
        </div>
    )
}

