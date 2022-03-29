import {
    ADD_CITY_TO_FAVOURITES,
    DEFINE_FIRST_LAUNCH,
    FORECAST_SEARCH_RESULT,
    REMOVE_CITY_FROM_FAVORITES,
    SET_SEARCH_REQUEST,
    START_LOADING,
    STOP_LOADING,
    STORE_SEARCH_RESULT,
    SWITCH_MODE,
    SWITCH_TEMPERATURE_UNIT,
    SHOW_NOTIFICATION,
    CLOSE_NOTIFICATION, SHOW_TEXTFIELD_ERROR,
} from './actionTypes'

// Adding global variable isn't a good practise but usually such fields are set on backend side
let lastId = 0

const initState = {
    currentWeather: {},
    forecast: [],
    favourites: [],
    ui: {
        loading: false,
        nightMode: false,
        temperatureUnit: true,
        firstLaunch: true,
    },
    notification: {
        show: false,
        type: '',
        description: '',
    },
    currentSearch: {
        searchText: '',
        isValid: false,
        textFieldError: false,
    },
}

export function reducer(state: any = initState, action: any) {
    if (action.type === ADD_CITY_TO_FAVOURITES) {
        const isInFavourites = state.favourites.filter((city: any) => city.cityName.toLowerCase() === action.payload.cityName.toLowerCase())
        if (isInFavourites.length > 0) {
            return {
                ...state,
                favourites: state.favourites.filter((city: any) => city.id !== isInFavourites[0].id),
            }
        }
        return {
            ...state,
            favourites: [
                ...state.favourites, {
                    id: ++lastId,
                    cityName: action.payload.cityName,
                },
            ]
        }
    } else if (action.type === REMOVE_CITY_FROM_FAVORITES) {
        return {
            ...state,
            favourites: state.favourites.filter((city: any) => city.id !== action.payload.id),
        }
    } else if (action.type === START_LOADING) {
        return {
            ...state,
            ui: {
                ...state.ui,
                loading: true,
            },
        }
    } else if (action.type === STOP_LOADING) {
        return {
            ...state,
            ui: {
                ...state.ui,
                loading: false,
            },
        }
    } else if (action.type === SWITCH_MODE) {
        return {
            ...state,
            ui: {
                ...state.ui,
                nightMode: action.payload.nightMode,
            },
        }
    } else if (action.type === SWITCH_TEMPERATURE_UNIT) {
        return {
            ...state,
            ui: {
                ...state.ui,
                temperatureUnit: action.payload.temperatureUnit,
            },
        }
    } else if (action.type === STORE_SEARCH_RESULT) {
        return {
            ...state,
            currentWeather: {
                cityName: action.payload.cityName,
                weather: action.payload.currentWeather,
            },
        }
    } else if (action.type === FORECAST_SEARCH_RESULT) {
        return {
            ...state,
            forecast: action.payload.forecast,
        }
    } else if (action.type === DEFINE_FIRST_LAUNCH) {
        return {
            ...state,
            ui: {
                ...state.ui,
                firstLaunch: false,
            },
        }
    } else if (action.type === SET_SEARCH_REQUEST) {
        return {
            ...state,
            currentSearch: {
                ...state.currentSearch,
                searchText: action.payload.searchRequest,
                isValid: action.payload.isValid,
            },
        }
    } else if (action.type === SHOW_NOTIFICATION) {
        return {
            ...state,
            notification: {
                show: action.payload.show,
                type: action.payload.type,
                description: action.payload.description,
            },
        }
    } else if (action.type === CLOSE_NOTIFICATION) {
        return {
            ...state,
            notification: {
                ...state.notification,
                show: action.payload.show,
            },
        }
    } else if(action.type === SHOW_TEXTFIELD_ERROR) {
        return {
            ...state,
            currentSearch: {
                ...state.currentSearch,
                textFieldError: action.payload.textFieldError,
            }
        }
    }else
        return state
}
