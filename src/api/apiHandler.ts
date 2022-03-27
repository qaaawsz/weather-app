import {checkForEmpty} from '../utilityFunctions'

const API = 'm3lIdhjystxvR9nGScvSZ2HR7HIjIZam'
const REQUEST = 'https://dataservice.accuweather.com/'

export const fetchUserLocation = async (lat: number, long: number) =>
    fetchDataHandler(`${REQUEST}locations/v1/cities/geoposition/search?apikey=${API}&q=${lat},${long}&language=en-us`)

// Weather forecast and current weather are requested in one function to reduce amount of api calls by using mutual city key
export const fetchCityData = async (city: string | number) => {
    const cityKey = await fetchCityKey(city)

    if(checkForEmpty(cityKey)) return undefined

    const currentWeatherConditions = await fetchDataHandler(`${REQUEST}currentconditions/v1/${cityKey[0].Key}?apikey=${API}&language=en-us&details=true`)
    const fiveDaysForecast = await fetchDataHandler(`${REQUEST}forecasts/v1/daily/5day/${cityKey[0].Key}?apikey=${API}&language=en-us&metric=true`)

    return {currentWeatherConditions, fiveDaysForecast}
}

const fetchCityKey = async (city: string | number) =>
    typeof city === 'number' ? city : fetchDataHandler(`${REQUEST}locations/v1/cities/search?q=${city}&apikey=${API}`)

const fetchDataHandler = async (request: string) => {
    return fetch(request)
        .then(errorsHandler)
        .then(response => response.json())
        .catch(error => console.log('Error ', error))
}

const errorsHandler = (response: any) => {
    if (!response.ok) throw Error(response.statusText)
    return response
}
