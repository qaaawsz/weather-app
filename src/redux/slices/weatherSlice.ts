import {createSlice} from '@reduxjs/toolkit'

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        currentWeather: {
            cityName: '',
            weather: {},
        },
        forecast: [],
    },
    reducers: {
        storeCurrentWeather(state, action) {
            state.currentWeather.cityName = action.payload.cityName
            state.currentWeather.weather = action.payload.weather
        },
        storeForecast(state, action) {
            state.forecast = action.payload
        },
    }
})

export const {storeCurrentWeather, storeForecast} = weatherSlice.actions
export default weatherSlice.reducer
