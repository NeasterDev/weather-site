// This card will be used to display the current weather data

export const CurrentWeatherCard = ({
  date,
  currentTemp,
  feelsLike,
  options,
  icon,
  description
}) => {

  return (
    <div className="current-weather-container">
      <div className="current-date">Today, {date.toLocaleDateString("en-US", options)}</div>
      <div className="current-temp">
        
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
        {Math.round(currentTemp)}&#176;
      </div>
      <div className="current-feelslike">Feels like {Math.round(feelsLike)}&#176;; {description}</div>
    </div>
  );
};
