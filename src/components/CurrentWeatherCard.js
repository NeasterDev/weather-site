// This card will be used to display the current weather data

export const CurrentWeatherCard = ({ date, currentTemp, forecastArray, feelsLike }) => {

    console.log(date);
    let temp_date = new Date(date);
    return (
        <div>
            <div>Current Date: {date.toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"})}</div>
            <div>Current temp: {currentTemp}</div>
            <div>Current feelslike: {feelsLike}</div>
            <div>Current forecast: {forecastArray[0].clouds}</div>
            {forecastArray.map((weather, index) => {
                temp_date.setDate(temp_date.getDate() + index);
                return <div key={index}>
                    <div>Date: {temp_date.toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"})}</div>
                    <div> High/Low: {weather.temp.min}/{weather.temp.max} </div>
                </div>
            })}
        </div>
    )
}