// This card will be used to display the current weather data

export const CurrentWeatherCard = ({
  date,
  currentTemp,
  feelsLike,
  options
}) => {

  return (
    <div>
      <div>Current Date: {date.toLocaleDateString("en-US", options)}</div>
      <div>Current temp: {currentTemp}</div>
      <div>Current feelslike: {feelsLike}</div>
    </div>
  );
};
