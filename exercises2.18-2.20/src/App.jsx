import { useState, useEffect } from 'react'
import CountryInformation from './components/CountryData'
import countryService from './services/countries'
import WeatherInformation from './components/Weather'

function App() {
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState([])
  const [fetchStatus, setFetchStatus] = useState(true)
  const [showCountryData, setShowCountryData] = useState(false)
  const handleCountryChange = (event) => {
    console.log("set country as", event.target.value)
    setCountry(event.target.value)
  }

  const RenderCountries = () => {
    const countryClick = (country) => {
      setFetchStatus(true)
      setCountry(country)
      setCountries([country])
      setShowCountryData(true)
      console.log("showing", country)
    }
    if (showCountryData) return null;

    if (fetchStatus) {
      return countries.map(c => (
        <div key={c.name.official}>
          {c.name.common}
          <button onClick={() => countryClick(c.name.common)}>Show</button>
        </div>
      ));
    }

    return <div>Too many matches, specify another filter</div>
  };

  useEffect(() => {
    console.log('fetching countries...')
    if (country){
      countryService
        .getAll()
        .then(c => {
          const filtered = c.filter(c1 => 
             c1.name.common.toLowerCase().includes(country.toLowerCase())
          )

          if (filtered.length >= 10) {
            setFetchStatus(false)
            setShowCountryData(false)
          } else if (filtered.length == 1) {
            setFetchStatus(true)
            setCountry(filtered[0].name.common)
            setCountries(filtered)
            setShowCountryData(true)
            console.log(showCountryData, "country")

          } else {
            setFetchStatus(true)
            setCountries(filtered)
            setShowCountryData(false)
          }          
        })
      }
  }, [country])


  return (
    <div>
      find countries 
      <input onChange={handleCountryChange}/>
      <RenderCountries />
      {showCountryData ? <CountryInformation country={country} showCountryData={showCountryData}/> : ''}
      {showCountryData ? <WeatherInformation country={country} showCountryData={showCountryData}/> : ''}
    </div>
  )
}

export default App
