import {configureStore, combineReducers} from '@reduxjs/toolkit'
import interfaceSlice from './slices/interfaceSlice'
import weatherSlice from './slices/weatherSlice'
import notificationSlice from './slices/notificationSlice'
import favouritesSlice from './slices/favouritesSlice'
import searchSlice from './slices/searchSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    weather: weatherSlice,
    favourites: favouritesSlice,
    interface: interfaceSlice,
    notification: notificationSlice,
    search: searchSlice,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

export default store
