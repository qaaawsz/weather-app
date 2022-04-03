import React from 'react'
import {Box, Grid, Typography} from '@material-ui/core'
import {DailyCardType} from '../../types/types'
import {getAverageTemperature} from '../../utilityFunctions'
import useWindowSize from '../hooks/useWindowSize'

// Conversion of the temperatures to and from celsius, fahrenheit is done manually by getAverageTemperature() because of the api issues
// Both temperature in F and C should be provided in one call, otherwise it causes too many api calls (which is limited in this case)

const DailyCard: React.FC<DailyCardType> = ({day, temperatureUnit}) => {
    const {width: screenWidth} = useWindowSize()
    const {Date: date, Temperature, Day} = day
    const dayOfWeek = new Date(date).toLocaleString('en-us', {weekday: 'long'}).slice(0, 3).toUpperCase()
    const measureUnit = temperatureUnit ? 'C' : 'F'
    const weatherIcon = Day.Icon

    const averageTemperature = getAverageTemperature(temperatureUnit, Temperature.Minimum.Value, Temperature.Maximum.Value)

    return (
        <Grid style={{flex: 1}} item>
            <Box m={1}>
                <Typography variant="body1">
                    {dayOfWeek}
                </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" m={1}>
                <Box my={1}>
                    {/*It's a bad practise to resize images manually, but it's okay for an example*/}
                    <img alt="weather-icon" width={screenWidth > 500 ? '100%' : '50px'}
                         src={`/assets/weatherIcons/${weatherIcon}.png`}/>
                </Box>
                <Typography variant="body2">
                    {averageTemperature}&deg;{measureUnit}
                </Typography>
            </Box>
        </Grid>
    )
}

export default DailyCard
