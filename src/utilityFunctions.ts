import {startLoading, stopLoading, defineFirstLaunch} from './redux/slices/interfaceSlice'
import {showNotification} from './redux/slices/notificationSlice'
import {fetchCityData, fetchUserLocation} from './api/apiHandler'
import {setSearchRequest} from './redux/slices/searchSlice'
import {storeCurrentWeather, storeForecast} from './redux/slices/weatherSlice'

export const searchForCity = async (dispatch: Function, city: string) => {
    dispatch(startLoading())
    const response = await fetchCityData(city)

    if (!response) {
        dispatch(setSearchRequest({searchText: '', isValid: false}))
        dispatch(stopLoading())
        dispatch(showNotification({
            type: 'error',
            description: 'Something went wrong, please try again',
        }))
        return
    }

    dispatch(storeCurrentWeather({cityName: city, weather: response.currentWeatherConditions[0]}))
    dispatch(storeForecast(response.fiveDaysForecast.DailyForecasts))

    dispatch(setSearchRequest({searchText: '', isValid: false}))
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

        dispatch(storeCurrentWeather({cityName: LocalizedName, weather: response.currentWeatherConditions[0]}))
        dispatch(storeForecast(response.fiveDaysForecast.DailyForecasts))

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
