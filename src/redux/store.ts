import {configureStore} from '@reduxjs/toolkit'
import interfaceSlice from './slices/interfaceSlice'
import weatherSlice from './slices/weatherSlice'
import notificationSlice from './slices/notificationSlice'
import favouritesSlice from './slices/favouritesSlice'
import searchSlice from './slices/searchSlice'


export default configureStore({
    reducer: {
        weather: weatherSlice,
        favourites: favouritesSlice,
        interface: interfaceSlice,
        notification: notificationSlice,
        search: searchSlice,
    }
})
