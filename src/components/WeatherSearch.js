
export const WeatherSearch = () => {
    return (
        <div>
            <h1>Weather</h1>
            <form className='search-form'>
                <label htmlFor='city-search-input'>Search for city </label>
                <input list='locations' name='city-search-input' id='search-input'></input>
                <label htmlFor='state-search-input'>State </label>
                <input type="text" name="state-search-input" id='state-search-input'></input>
                <label htmlFor='country-search-input'>Country </label>
                <input type="text" name="country-search-input" id='country-search-input'></input><br/>
                <button className='btn-blue' type='submit'>Search</button>
            </form>
            <hr />
        </div>
    )
}

