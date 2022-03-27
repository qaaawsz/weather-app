import React from 'react'
import FavoritePage from './pages/favorite/FavoritePage'
import WeatherPage from './pages/weather/WeatherPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ErrorPage from './pages/error/ErrorPage'
import Header from './components/header/Header'
import {useDispatch, useSelector} from 'react-redux'
import {searchByGeolocation} from './utilityFunctions'
import Notification from './components/notification/Notification'

const App: React.FC = () => {
    const {firstLaunch} = useSelector((state: any) => state.ui)
    const dispatch = useDispatch()

    firstLaunch && searchByGeolocation(dispatch)

    return (
        <Router>
            <Header/>
            <Notification />
            <Routes>
                <Route path="/" element={<WeatherPage/>}/>
                <Route path="/favourite" element={<FavoritePage/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </Router>
    )
}

export default App
