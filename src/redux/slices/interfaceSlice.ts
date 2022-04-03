import {createSlice} from '@reduxjs/toolkit'

const interfaceSlice = createSlice({
    name: 'interface',
    initialState: {
        loading: false,
        nightMode: false,
        temperatureUnit: true,
        firstLaunch: true,
    },
    reducers: {
        startLoading(state) {
            state.loading = true
        },
        stopLoading(state) {
            state.loading = false
        },
        toggleNightMode(state) {
            state.nightMode = !state.nightMode
        },
        toggleTemperatureUnit(state) {
            state.temperatureUnit = !state.temperatureUnit
        },
        defineFirstLaunch(state) {
            state.firstLaunch = false
        },
    },
})

export const {startLoading, stopLoading, toggleNightMode, toggleTemperatureUnit, defineFirstLaunch} = interfaceSlice.actions
export default interfaceSlice.reducer
