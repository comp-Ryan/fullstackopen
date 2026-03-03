import countryService from '../services/countries'
import { useState, useEffect } from "react"


const CountryInformation = ({country, showCountryData}) => {
    if (showCountryData === false){
        return
    }
    const [countryData, setCountryData] = useState(null)

    useEffect(() => {
        if (country){
            console.log(country)

            countryService
                .getCountry(country)
                .then(data => setCountryData(data))
                .catch(error => {})
        }
    }, [country])
    
    if (countryData) {
        console.log(Object.entries(countryData.languages))
        return (
            <div>
                <h1>{countryData.name.common}</h1>
                <div>Capital {countryData.capital[0]}</div>
                <div>Area {countryData.area}</div>

                <h2>Languages</h2>
                <ul>
                    {Object.entries(countryData.languages).map(([code, language]) => <li key={code}>{language}</li>)}
                </ul>
                <img src={countryData.flags.svg} alt={`Flag of ${countryData.name.common}`} width="200" style={{marginTop: "5px"}}/>
            </div>
        )
    }
    else {
        return
    }
    
    
}

export default CountryInformation