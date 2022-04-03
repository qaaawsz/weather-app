import React from 'react'
import FavoritePage from './pages/favorite/FavoritePage'
import WeatherPage from './pages/weather/WeatherPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ErrorPage from './pages/error/ErrorPage'
import Header from './components/header/Header'
import {useDispatch, useSelector} from 'react-redux'
import {searchByGeolocation} from './utilityFunctions'
import Notification from './components/notification/Notification'
import clsx from 'clsx'
import useThemeSwitch from './components/hooks/useThemeSwitch'
import useWindowSize from './components/hooks/useWindowSize'
import {Box} from '@material-ui/core'

const App: React.FC = () => {
    const {height} = useWindowSize()
    const {firstLaunch} = useSelector((state: any) => state.interface)
    const {colorSwitcher} = useThemeSwitch()
    const dispatch = useDispatch()

    firstLaunch && searchByGeolocation(dispatch)

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{height: height}}
            className={clsx(colorSwitcher())}
        >
            <Router>
                <Header/>
                <Notification/>
                <Routes>
                    <Route path="/" element={<WeatherPage/>}/>
                    <Route path="/favourite" element={<FavoritePage/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
            </Router>
        </Box>
    )
}

export default App
