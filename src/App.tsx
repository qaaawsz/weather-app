import React, {useEffect} from 'react'
import FavoritePage from './pages/favorite/FavoritePage'
import WeatherPage from './pages/weather/WeatherPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ErrorPage from './pages/error/ErrorPage'
import Header from './components/header/Header'
import {useDispatch, useSelector} from 'react-redux'
import {searchByGeolocation} from './utilityFunctions'
import Notification from './components/notification/Notification'
import {setSearchRequest, showTextFieldError} from './redux/slices/searchSlice'
import {closeNotification} from './redux/slices/notificationSlice'

const App: React.FC = () => {
    const {firstLaunch} = useSelector((state: any) => state.interface)
    const dispatch = useDispatch()

    firstLaunch && searchByGeolocation(dispatch)

    // useEffect cleanup here exists to check when user closes tab and reset search and notifications in case some data left there
    useEffect(() => {
        const cleanup = () => {
            dispatch(setSearchRequest(
                {searchText: '', isValid: 'false'}
            ))
            dispatch(showTextFieldError({textFieldError: false}))
            dispatch(closeNotification())
        }

        window.addEventListener('beforeunload', cleanup)

        return () => {
            window.removeEventListener('beforeunload', cleanup)
        }
    }, [])

    return (
        <Router>
            <Header/>
            <Notification/>
            <Routes>
                <Route path="/" element={<WeatherPage/>}/>
                <Route path="/favourite" element={<FavoritePage/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </Router>
    )
}

export default App
