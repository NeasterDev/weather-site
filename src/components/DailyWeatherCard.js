// this weather card will be used for multi-day forecasts

export const DailyWeatherCard = ({ forecastArray }) => {

    // these are the format options for the localeDateString
    const options = {
        month: "short", // Nov
        day: "numeric", // 00
        year: "numeric", // 0000
    };

    return (
        // container to hold all forecast containers
        <div className="daily-forecast-container fade-in">
            {forecastArray.map((weather, index) => {
                console.log("Weather: " + index);
                console.log(weather);
                // skips the first date because we already show to current day 
                // and the values were different for some reason
                if (index === 0) { return; }
                return (
                    // container to hold each indivudal days information
                    <div className="daily-container" key={index}>
                        {/* need the date, high/low of the day, and the description, ie clouds, rain etc... */}
                        <div className="daily-date">
                            {new Date(weather.dt * 1000).toLocaleDateString("en-US", options)}
                        </div>
                        <div className="daily-min-max">
                            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
                            {Math.round(weather.temp.min)}&#176;/{Math.round(weather.temp.max)}&#176;

                        </div>
                        <div className="daily-description">
                            {weather.weather[0].description}
                        </div>
                        <br />
                        <hr />
                        <br />
                    </div>
                );
            })}
        </div>
    )
}