import {
    ADD_CITY_TO_FAVOURITES, CLOSE_NOTIFICATION, DEFINE_FIRST_LAUNCH, FORECAST_SEARCH_RESULT,
    REMOVE_CITY_FROM_FAVORITES, SET_SEARCH_REQUEST, SHOW_NOTIFICATION, SHOW_TEXTFIELD_ERROR,
    START_LOADING,
    STOP_LOADING, STORE_SEARCH_RESULT, SWITCH_MODE, SWITCH_TEMPERATURE_UNIT,
} from './actionTypes'
import {DayForecastType, WeatherCardType} from '../types/types'
import {Color} from '@material-ui/lab'

export const addCity = (cityName: string) => ({
    type: ADD_CITY_TO_FAVOURITES,
    payload: {
        cityName,
    },
})

export const removeCity = (id: number) => ({
    type: REMOVE_CITY_FROM_FAVORITES,
    payload: {
        id,
    },
})

export const startLoading = () => ({
    type: START_LOADING,
    payload: {
        loading: true,
    },
})

export const stopLoading = () => ({
    type: STOP_LOADING,
    payload: {
        loading: false,
    },
})

export const switchMode = (oldValue: boolean) => ({
    type: SWITCH_MODE,
    payload: {
        nightMode: !oldValue,
    },
})

export const switchTemperatureUnit = (oldValue: boolean) => ({
    type: SWITCH_TEMPERATURE_UNIT,
    payload: {
        temperatureUnit: !oldValue,
    },
})

export const storeSearchResult = (cityName: string, currentWeather: WeatherCardType) => ({
    type: STORE_SEARCH_RESULT,
    payload: {
        cityName,
        currentWeather,
    }
})

export const storeForecastResult = (forecast: DayForecastType[]) => ({
    type: FORECAST_SEARCH_RESULT,
    payload: {
        forecast,
    },
})

export const defineFirstLaunch = () => ({
    type: DEFINE_FIRST_LAUNCH,
})

export const setSearchRequest = (searchRequest: string, isValid: boolean) => ({
    type: SET_SEARCH_REQUEST,
    payload: {
        searchRequest,
        isValid,
    },
})

export const showNotification = (type: Color, description: string) => ({
    type: SHOW_NOTIFICATION,
    payload: {
        show: true,
        type,
        description,
    }
})

export const closeNotification = () => ({
    type: CLOSE_NOTIFICATION,
    payload: {
        show: false,
    }
})

export const showTextFieldError = (textFieldError: boolean) => ({
    type: SHOW_TEXTFIELD_ERROR,
    payload: {
        textFieldError,
    }
})
