import { useState } from "react"

export const WeatherSearch = () => {
    const API = "03c8e245a77af365bd5c0468aae6ab2a";
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    const searchForLocation = (e) => {
        e.preventDefault();
        console.log(city);
        console.log(state);
        console.log(country);
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;
        if (state) {
            if (country) {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${API}`;
            }
        } else {
            if (country) {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API}`;
            }
        }
        fetch(url)
        .then(data => data.json())
        .then(json => {
            console.log(json);
            console.log("lat: " + json.coord.lat);
            console.log("lon: " + json.coord.lon);
            console.log("City: " + json.name);
            console.log("Country: " + json.sys.country);
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${json.coord.lat}&lon=${json.coord.lon}&appid=${API}`)
            .then(data => data.json())
            .then(json => console.log(json));
        });
    }

    return (
        <div className="search-form-container">
            <h1 className="form-title">Weather</h1>
            <form className='search-form' onSubmit={searchForLocation}>
                <div className="search-container">
                    <input className="search-box" placeholder="City" onChange={(e) => setCity(e.target.value)}/>
                    <input className="search-box" placeholder="State" onChange={(e) => setState(e.target.value.toLowerCase())}/>
                    <input className="search-box" placeholder="Country" onChange={(e) => setCountry(e.target.value.toLowerCase())}/>
                </div>
                <button className='btn-blue' type='submit'>Search</button>
            </form>
        </div>
    )
}

