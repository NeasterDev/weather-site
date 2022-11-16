import React from "react";
import { CurrentWeatherCard } from "./CurrentWeatherCard";
import { DailyWeatherCard } from "./DailyWeatherCard";

export class WeatherSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      currentTemp: "",
      forecastArray: [],
      feelsLike: "",
      currentIcon: "",
      currentDescription: "",
      searchError: false,
    };
    // use this to get data about the search form, specifically the height,
    // This was used to fix the search form scrolling down on page load
    this.ref = React.createRef();
  }

  // API Key for openweathermap
  API = "03c8e245a77af365bd5c0468aae6ab2a";

  // I use these instead of the state so that the component doesnt reload when I type
  // in the search form
  city = "";
  country = "";

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

    // fetch url, with country if they included it
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.API}`;
    if (this.country) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${this.API}`;
    }

    // we use this fetch to find the lon/lat
    fetch(url)
      .then((data) => {
        if (data.ok) {
          this.setState({ searchError: false }, () => {
            console.log(this.state.searchError);
          });
          return data.json();
        } else {
          console.log(data.status);
          this.setState({ searchError: true }, () => {
            console.log(this.state.searchError);
          });
        //   Re-open the search bar if there was an error
          this.dropdownClickHandler();
          return "error";
        }
      })
      .then((json) => {
        console.log(json);
        // this fetch to find the weather forecast
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${json.coord.lat}&lon=${json.coord.lon}&units=imperial&appid=${this.API}`
        )
          .then((data) => data.json())
          .then((json) => {
            //json.daily for weekly forecast
            //json.current for daily forecast
            // creates a date and converts it from unix to a readable date
            let date = new Date(json.current.dt * 1000);

            this.setState({
              ...this.state,
              date: date,
              currentTemp: json.current.temp,
              feelsLike: json.current.feels_like,
              forecastArray: json.daily,
              currentIcon: json.current.weather[0].icon,
              currentDescription: json.current.weather[0].description,
            });
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
    const dropDownHeight = dropDownContainer.style.height;

    // if the current height is 0px, set the height to the maximum height
    // else set it back to 0px
    if (dropDownHeight === "0px" || this.ref.current.offsetHeight === 0) {
      dropDownContainer.style.height = containerHeight + "px";
    } else {
      dropDownContainer.style.height = "0px";
    }
  };

  leftScrollHandler = () => {
    const dailyForecastContainer = document.querySelector(
      ".daily-forecast-container"
    );
    dailyForecastContainer.scrollLeft -= 1000;
  };

  rightScrollHandler = () => {
    const dailyForecastContainer = document.querySelector(
      ".daily-forecast-container"
    );
    dailyForecastContainer.scrollLeft += 1000;
  };

  componentDidUpdate() {
    const currentWeatherContainer = document.querySelector(
      ".current-weather-container"
    );
    if (currentWeatherContainer) {
      currentWeatherContainer.classList.toggle("fade-in");
    }
  }

  componentDidMount() {
    this.dropdownClickHandler();
  }

  render() {
    return (
      <div className="search-form-container">
        <button
          className="form-title dropdown-button"
          onClick={this.dropdownClickHandler}
        >
          Weather
        </button>
        <div ref={this.ref} className="drop-down-container">
          <form className="search-form" onSubmit={this.searchForLocation}>
            <div className="search-container">
              <input
                className="search-box"
                placeholder="City"
                onChange={(e) => (this.city = e.target.value)}
              />
              <input
                maxLength="2"
                className="search-box"
                placeholder="Country; US, UK etc..."
                onChange={(e) => (this.country = e.target.value.toLowerCase())}
              />
            </div>
            <button className="btn-blue" type="submit">
              Search
            </button>
          </form>
        </div>

        {this.state.searchError === true ? <div className="error-message">No city found with that name, try again...</div> : null}

        {this.state.date ? (
          <CurrentWeatherCard
            date={this.state.date}
            currentTemp={this.state.currentTemp}
            feelsLike={this.state.feelsLike}
            options={this.options}
            icon={this.state.currentIcon}
            description={this.state.currentDescription}
          />
        ) : null}

        {
          // if the forecast array has been loaded, load the dailyweathercard
          this.state.forecastArray.length ? (
            <div>
              <DailyWeatherCard
                forecastArray={this.state.forecastArray}
                options={this.options}
              />
              <div className="scroll-buttons-container">
                <button
                  className="scroll-left"
                  onClick={this.leftScrollHandler}
                >
                  {"<"}
                </button>
                <button
                  className="scroll-right"
                  onClick={this.rightScrollHandler}
                >
                  {">"}
                </button>
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
}
