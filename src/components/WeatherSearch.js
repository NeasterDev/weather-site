import { useState } from "react"
import { CurrentWeatherCard } from "./CurrentWeatherCard";
import { DailyWeatherCard } from "./DailyWeatherCard";

export const WeatherSearch = () => {
    const API = "03c8e245a77af365bd5c0468aae6ab2a";
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    const [date, setDate] = useState("");
    const [currentTemp, setCurrentTemp] = useState("");
    const [forecastArray, setForcastArray] = useState([]);
    const [feelsLike, setFeelsLike] = useState("");

    // these are the format options for the localeDateString
    const options = {
        month: "short", // Nov
        day: "numeric", // 00
        year: "numeric", // 0000
    };

    const searchForLocation = (e) => {
        e.preventDefault();

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;
        if (country) {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API}`;
        }
        // we use this fetch to find the lon/lat
        fetch(url)
            .then(data => data.json())
            .then(json => {
                console.log(json);
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

                        //setDate("11/2/2022");
                        let date = new Date(json.current.dt * 1000);
                        console.log(date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }));
                        // setDate(c;
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
                    <input className="search-box" placeholder="City" onChange={(e) => setCity(e.target.value)} />
                    <input maxLength="2" className="search-box" placeholder="Country; US, UK etc..." onChange={(e) => setCountry(e.target.value.toLowerCase())} />
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
            {
                // if the forecast array has been loaded, load the dailyweathercard
                forecastArray ? <DailyWeatherCard forecastArray={forecastArray} options={options} /> : null
            }
        </div>
    )
}

