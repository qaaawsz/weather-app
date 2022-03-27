import {
    defineFirstLaunch,
    setSearchRequest, showNotification,
    startLoading,
    stopLoading,
    storeForecastResult,
    storeSearchResult
} from './redux/actionCreator'
import {fetchCityData, fetchUserLocation} from './api/apiHandler'

export const searchForCity = async (dispatch: Function, city: string) => {
    dispatch(startLoading())
    const response = await fetchCityData(city)

    if (!response) {
        dispatch(setSearchRequest('', false))
        dispatch(stopLoading())
        dispatch(showNotification('error', 'Something went wrong, please try again'))
        return
    }

    dispatch(storeSearchResult(city, response.currentWeatherConditions[0]))
    dispatch(storeForecastResult(response.fiveDaysForecast.DailyForecasts))

    dispatch(setSearchRequest('', false))
    dispatch(stopLoading())
}

export const searchByGeolocation = async (dispatch: Function) => {
    dispatch(startLoading())
    dispatch(defineFirstLaunch())

    const geolocationSearch = async (position: any) => {
        const {Key, LocalizedName} = await fetchUserLocation(position.coords.latitude, position.coords.longitude)
        const response = await fetchCityData(Key)

        if (!response) {
            dispatch(stopLoading())
            return
        }

        dispatch(storeSearchResult(LocalizedName, response.currentWeatherConditions[0]))
        dispatch(storeForecastResult(response.fiveDaysForecast.DailyForecasts))

        dispatch(stopLoading())
    }

    const defaultSearch = async (error: any) => {
        console.log(error)
        await searchForCity(dispatch, 'Tel Aviv')
        dispatch(stopLoading())
    }

    navigator.geolocation.getCurrentPosition(geolocationSearch, defaultSearch)
}

const cToF = (celsius: number) => Number((celsius * 9 / 5 + 32).toFixed(1))

export const getAverageTemperature = (temperatureUnit: boolean, minTemp: number, maxTemp: number) => temperatureUnit
    ? Math.floor(minTemp + maxTemp) / 2
    : Math.floor(cToF(minTemp) + cToF(maxTemp)) / 2

export const checkForEmpty = (instance: any) => {
    for (let i in instance) return false
    return true
}
