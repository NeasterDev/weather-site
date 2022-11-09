import { useEffect, useState } from "react";
import { CurrentWeatherCard } from "./CurrentWeatherCard";
import { DailyWeatherCard } from "./DailyWeatherCard";

export const WeatherSearch = () => {
    const API = "03c8e245a77af365bd5c0468aae6ab2a";
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    // current weather data
    const [date, setDate] = useState("");
    const [currentTemp, setCurrentTemp] = useState("");
    const [forecastArray, setForcastArray] = useState([]);
    const [feelsLike, setFeelsLike] = useState("");
    const [currentIcon, setCurrentIcon] = useState("");
    const [currentDescription, setCurrentDescription] = useState("");

    // these are the format options for the localeDateString
    const options = {
        month: "short", // Nov
        day: "numeric", // 00
        year: "numeric", // 0000
    };

    const searchForLocation = (e) => {
        e.preventDefault();

        // closes the search 
        dropdownClickHandler();

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;

        if (country) {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API}`;
        }

        // we use this fetch to find the lon/lat

        fetch(url)
            .then((data) => data.json())
            .then((json) => {
                console.log(json);
                // this fetch to find the weather forecast
                fetch(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${json.coord.lat}&lon=${json.coord.lon}&units=imperial&appid=${API}`
                )
                    .then((data) => data.json())
                    .then((json) => {
                        // weather forecast data here
                        // get current weather data here
                        console.log("Current Weather: ");
                        console.log(json.current);
                        // 8 day forecast here; 0 - 7, 0 is today
                        console.log("8 Day Forecast weather: ");
                        console.log(json.daily);

                        //setDate("11/2/2022");
                        let date = new Date(json.current.dt * 1000);

                        setDate(date);
                        setCurrentTemp(json.current.temp);
                        setFeelsLike(json.current.feels_like);
                        setForcastArray(json.daily);
                        setCurrentIcon(json.current.weather[0].icon);
                        setCurrentDescription(json.current.weather[0].description);
                    });
            });
    };

    // Will handle changing css values to transition
    const dropdownClickHandler = () => {
        // Drop down container element
        const dropDownContainer = document.querySelector(".drop-down-container");
        // the maximum height of the container
        const containerHeight = dropDownContainer.scrollHeight;
        // The current height of the container 
        const dropDownHeight = dropDownContainer.style.height

        // if the current height is 0px, set the height to the maximum height 
        // else set it back to 0px
        console.log(dropDownContainer);
        console.log(dropDownHeight);
        if(dropDownHeight === "0px") {
            console.log("container hieght");
            dropDownContainer.style.height = containerHeight + "px";
        } else {
            dropDownContainer.style.height = "0px";
        }
        
    }

    // toggles the fade in class to animate the current weather
    useEffect(() => {
        const currentWeatherContainer = document.querySelector(".current-weather-container");
        if (currentWeatherContainer) {
            currentWeatherContainer.classList.toggle("fade-in");
        }

    }, [currentTemp]);

    // useEffect for when the page loads
    useEffect(() => {
        dropdownClickHandler()
        dropdownClickHandler();
    }, []);

    return (
        <div className="search-form-container">
            <button className="form-title dropdown-button" onClick={dropdownClickHandler}>Weather</button>
            <div className="drop-down-container">
                <form className="search-form" onSubmit={searchForLocation}>
                    <div className="search-container">
                        <input
                            className="search-box"
                            placeholder="City"
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input
                            maxLength="2"
                            className="search-box"
                            placeholder="Country; US, UK etc..."
                            onChange={(e) => setCountry(e.target.value.toLowerCase())}
                        />
                    </div>
                    <button className="btn-blue" type="submit">
                        Search
                    </button>
                </form>
            </div>
            {date ? (
                <CurrentWeatherCard
                    date={date}
                    currentTemp={currentTemp}
                    feelsLike={feelsLike}
                    options={options}
                    icon={currentIcon}
                    description={currentDescription}
                />
            ) : null}

            {
                // if the forecast array has been loaded, load the dailyweathercard
                forecastArray ? (
                    <DailyWeatherCard forecastArray={forecastArray} options={options} />
                ) : null
            }
        </div>
    );
};
