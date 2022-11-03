// This card will be used to display the current weather data

export const CurrentWeatherCard = ({
  date,
  currentTemp,
  forecastArray,
  feelsLike,
}) => {
  // these are the format options for the localeDateString
  const options = {
    month: "short", // Nov
    day: "numeric", // 00
    year: "numeric", // 0000
  };

  return (
    <div>
      <div>Current Date: {date.toLocaleDateString("en-US", options)}</div>
      <div>Current temp: {currentTemp}</div>
      <div>Current feelslike: {feelsLike}</div>
      <div>Current forecast: {forecastArray[0].clouds}</div>
      <br />
      <hr />
      <br />
      {forecastArray.map((weather, index) => {
        return (
          <div key={index}>
            <div>
              Date:
              {new Date(weather.dt * 1000).toLocaleDateString("en-US", options)}
            </div>
            <div>
              High/Low: {weather.temp.min}/{weather.temp.max}
            </div>
          </div>
        );
      })}
    </div>
  );
};
