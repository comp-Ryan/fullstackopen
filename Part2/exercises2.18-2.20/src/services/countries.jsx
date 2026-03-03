import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getAll = () => {
  const request = axios.get(`${baseUrl}all`)
  return request.then(response => response.data)
}

const getCountry = ( country ) => {
  console.log("fetching...", country)
  const request = axios.get(`${baseUrl}name/${country}`)
  if (request){
    return request.then(response => response.data)
  }
  return
}

const getWeather = ( country ) => {
  console.log("weather", country)
  
  const request = axios.get(`${weatherUrl}?q=${country}&appid=${api_key}&units=metric`)
  if (request){
    return request.then(response => response.data)
  }
  return
}

export default { 
  getAll: getAll,  
  getCountry: getCountry,
  getWeather: getWeather
}