import {createSlice} from '@reduxjs/toolkit'

let lastId = 0

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: {
        favourites: [] as any,
    },
    reducers: {
        addCity(state, action) {
            const isInFavourites: any = state.favourites.filter((city: any) => city.cityName.toLowerCase() === action.payload.cityName.toLowerCase())
            if (isInFavourites.length > 0) {
                state.favourites = state.favourites.filter((city: any) => city.id !== isInFavourites[0].id)
            } else {
                state.favourites.push({
                    id: ++lastId,
                    cityName: action.payload.cityName,
                })
            }
        },
        removeCity(state, action) {
            state.favourites = state.favourites.filter((city: any) => city.id !== action.payload.id)
        },
    }
})

export const {addCity, removeCity} = favouritesSlice.actions
export default favouritesSlice.reducer
