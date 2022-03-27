import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Grid, IconButton, Box, Switch,
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import useWeatherCardStyles from './useWeatherCardStyles'
import {addCity, showNotification, switchTemperatureUnit} from '../../redux/actionCreator'
import {useDispatch, useSelector} from 'react-redux'
import DailyCard from '../dailyCard/DailyCard'
import {DayForecastType} from '../../types/types'
import clsx from 'clsx'

const WeatherCard: React.FC = () => {
    const {currentWeather, forecast, favourites, ui: {nightMode}} = useSelector((state: any) => state)

    const {
        cityName, weather: {
            LocalObservationDateTime, Temperature: {Metric, Imperial},
            TemperatureSummary: {Past12HourRange: {Minimum, Maximum}},
            WeatherText
        }
    } = currentWeather

    const {temperatureUnit} = useSelector((state: any) => state.ui)
    const dispatch = useDispatch()
    const classes = useWeatherCardStyles()

    const fullDate = new Date(LocalObservationDateTime)
        .toLocaleString('default', {year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'})

    const isInFavourites = favourites.filter((city: any) => city.cityName === cityName)
    const unit = temperatureUnit ? 'C' : 'F'
    const temperature = temperatureUnit ? Metric.Value : Imperial.Value

    const minTemp = temperatureUnit
        ? Minimum.Metric.Value
        : Imperial.Value

    const maxTemp = temperatureUnit
        ? Maximum.Metric.Value
        : Maximum.Imperial.Value

    return (
        <Card className={clsx(classes.card, {[classes.cardDark]: nightMode})}>
            <Box display="flex" justifyContent="space-between" p={1}>
                <Box display="flex" alignItems="center">
                    <Typography variant="body2">&deg;C</Typography>
                    <Switch className={classes.switch} size="small" checked={!temperatureUnit}
                            onChange={() => {
                                dispatch(switchTemperatureUnit(temperatureUnit))
                                dispatch(showNotification('success', `Measure unit changed to ${!temperatureUnit ? 'C' : 'F'}`))
                            }}
                    />
                    <Typography variant="body2">&deg;F</Typography>
                </Box>
                <IconButton className={classes.icon} onClick={() => {
                    dispatch(addCity(cityName))
                    dispatch(showNotification('success',
                        `City successfully ${isInFavourites.length ? 'removed from' : 'saved to'} favourites`))
                }}>
                    <FavoriteIcon className={isInFavourites.length ? classes.saved : classes.unsaved}/>
                </IconButton>
            </Box>
            <CardHeader
                title={<Typography className={classes.cardTitle} variant="h4">{cityName}</Typography>}
                subheader={
                    <Typography variant="subtitle1">{fullDate}</Typography>
                }
            />
            <CardContent className={classes.cardContent}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Typography className={classes.temperatureBlock} variant="h2">
                        {temperature}&deg;{unit}
                    </Typography>
                    <Box my={2}>
                        <Typography className={classes.separator} variant="h5">
                            ----------------
                        </Typography>
                    </Box>
                    <Box mb={0.5}>
                        <Typography className={classes.description}
                                    variant="body1">{WeatherText}</Typography>
                    </Box>
                    <Typography className={classes.minMax} variant="body1">
                        {minTemp}&deg;{unit} / {maxTemp}&deg;{unit}
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="end"
                    flex={1}
                    mb={1}
                    mt={4}
                >
                    <Grid className={classes.dailyWrapper} container justifyContent="center" alignContent="center">
                        {forecast.map((day: DayForecastType) =>
                            <DailyCard key={day.Date} day={day} temperatureUnit={temperatureUnit}/>
                        )}
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}

export default WeatherCard
