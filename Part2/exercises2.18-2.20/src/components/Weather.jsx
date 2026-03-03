import countryService from '../services/countries'
import {useState, useEffect} from 'react'

const WeatherInformation = ({country, showCountryData}) => {
    if (showCountryData === false){
        return
    }
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        if (country){
            countryService
                .getWeather(country)
                .then(data => setWeatherData(data))
                .catch(error => {})
        }
    }, [country])
    
    if (weatherData) {
        return (
            <div>
                <h1>Weather in {country}</h1>
                <div>Temperature {weatherData.main.temp} Celsius</div>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} alt={`Icon of ${weatherData.weather[0].main}`} width="200" style={{marginTop: "5px"}}/>
                <div>Wind {weatherData.wind.speed} m/s</div>
            </div>
        )
    }
    return <div style={{marginTop: '5px'}}>Weather Data not Found</div>
}

export default WeatherInformation