// this weather card will be used for multi-day forecasts

export const DailyWeatherCard = ({ forecastArray }) => {

    // these are the format options for the localeDateString
    const options = {
        month: "short", // Nov
        day: "numeric", // 00
        year: "numeric", // 0000
    };
    
    return (
        <div>
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
    )
}