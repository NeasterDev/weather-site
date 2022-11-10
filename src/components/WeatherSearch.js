import React from "react";
import { CurrentWeatherCard } from "./CurrentWeatherCard";
import { DailyWeatherCard } from "./DailyWeatherCard";

export class WeatherSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            country: "",
            date: "",
            currentTemp: "",
            forecastArray: [],
            feelsLike: "",
            currentIcon: "",
            currentDescription: "",
        }
    }

    API = "03c8e245a77af365bd5c0468aae6ab2a";

    // these are the format options for the localeDateString
    options = {
        month: "short", // Nov
        day: "numeric", // 00
        year: "numeric", // 0000
    };

    searchForLocation = (e) => {
        e.preventDefault();

        // closes the search 
        this.dropdownClickHandler();

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${this.API}`;

        if (this.country) {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&appid=${this.API}`;
        }

        // we use this fetch to find the lon/lat

        fetch(url)
            .then((data) => data.json())
            .then((json) => {
                console.log(json);
                // this fetch to find the weather forecast
                fetch(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${json.coord.lat}&lon=${json.coord.lon}&units=imperial&appid=${this.API}`
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

                        this.setState({ 
                            ...this.state,
                            date,
                            currentTemp: json.current.temp,
                            feelsLike: json.current.feels_like,
                            forecastArray: json.daily,
                            currentIcon: json.current.weather[0].icon,
                            currentDescription: json.current.weather[0].description
                        })
                    });
            });
    };

    // Will handle changing css values to transition
    dropdownClickHandler = () => {
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
        if (dropDownHeight === "0px") {
            console.log("container hieght");
            dropDownContainer.style.height = containerHeight + "px";
        } else {
            dropDownContainer.style.height = "0px";
        }

    }

    componentDidUpdate() {
        const currentWeatherContainer = document.querySelector(".current-weather-container");
        if (currentWeatherContainer) {
            currentWeatherContainer.classList.toggle("fade-in");
        }
    }

    componentDidMount() {
        this.dropdownClickHandler();
        this.dropdownClickHandler();
    }

    render() {
        return (
            <div className="search-form-container">
                <button className="form-title dropdown-button" onClick={this.dropdownClickHandler}>Weather</button>
                <div className="drop-down-container">
                    <form className="search-form" onSubmit={this.searchForLocation}>
                        <div className="search-container">
                            <input
                                className="search-box"
                                placeholder="City"
                                onChange={(e) => this.setState({...this.state, city: e.target.value})}
                            />
                            <input
                                maxLength="2"
                                className="search-box"
                                placeholder="Country; US, UK etc..."
                                onChange={(e) => this.setState({...this.state, country: e.target.value.toLowerCase()})}
                            />
                        </div>
                        <button className="btn-blue" type="submit">
                            Search
                        </button>
                    </form>
                </div>
                {this.state.date ? (
                    <CurrentWeatherCard
                        date={this.state.date}
                        currentTemp={this.state.currentTemp}
                        feelsLike={this.state.feelsLike}
                        options={this.state.options}
                        icon={this.state.currentIcon}
                        description={this.state.currentDescription}
                    />
                ) : null}

                {
                    // if the forecast array has been loaded, load the dailyweathercard
                    this.state.forecastArray ? (
                        <DailyWeatherCard forecastArray={this.state.forecastArray} options={this.options} />
                    ) : null
                }
            </div>
        );
    }
};
