import React from 'react'
import {useSelector} from 'react-redux'
import {Box, Grid, Typography} from '@material-ui/core'
import Preloader from '../../components/preloader/Preloader'
import WeatherCard from '../../components/weatherCard/WeatherCard'
import {checkForEmpty} from '../../utilityFunctions'
import useThemeSwitch from '../../components/hooks/useThemeSwitch'
import clsx from 'clsx'

const WeatherPage: React.FC = () => {
    const {currentWeather, forecast, ui: {loading}} = useSelector((state: any) => state)
    const {colorSwitcher} = useThemeSwitch()

    if (loading) return <Preloader/>

    if (checkForEmpty(currentWeather.weather) || checkForEmpty(forecast)) return (
        <Box className={clsx(colorSwitcher())} m={3} textAlign="center">
            <Typography variant="h6">
                To search for weather forecast type the city name in the searchbox above
            </Typography>
        </Box>
    )

    return (
        <Grid style={{flex: 1}} item container xs={12}>
            <Grid container item xs={12} justifyContent="center" alignItems="center">
                <WeatherCard/>
            </Grid>
        </Grid>
    )
}

export default WeatherPage
