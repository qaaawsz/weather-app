import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Grid, IconButton, Box, Switch,
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import useWeatherCardStyles from './useWeatherCardStyles'
import {showNotification} from '../../redux/slices/notificationSlice'
import {toggleTemperatureUnit} from '../../redux/slices/interfaceSlice'
import {useDispatch, useSelector} from 'react-redux'
import DailyCard from '../dailyCard/DailyCard'
import {DayForecastType} from '../../types/types'
import clsx from 'clsx'
import {addCity} from '../../redux/slices/favouritesSlice'

const WeatherCard: React.FC = () => {
    const {weather: {currentWeather, forecast}, favourites, interface: {nightMode}} = useSelector((state: any) => state)

    const {
        cityName, weather: {
            LocalObservationDateTime, Temperature: {Metric, Imperial},
            TemperatureSummary: {Past12HourRange: {Minimum, Maximum}},
            WeatherText
        }
    } = currentWeather

    const {temperatureUnit} = useSelector((state: any) => state.interface)
    const dispatch = useDispatch()
    const classes = useWeatherCardStyles()

    const fullDate = new Date(LocalObservationDateTime)
        .toLocaleString('default', {year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'})

    const isInFavourites = favourites.favourites.filter((city: any) => city.cityName === cityName)
    const unit = temperatureUnit ? 'C' : 'F'
    const temperature = temperatureUnit ? Metric.Value : Imperial.Value

    const minTemp = temperatureUnit
        ? Minimum.Metric.Value
        : Imperial.Value

    const maxTemp = temperatureUnit
        ? Maximum.Metric.Value
        : Maximum.Imperial.Value

    const onTemperatureToggle = () => {
        dispatch(toggleTemperatureUnit())
        dispatch(showNotification({
            type: 'success',
            description: `Measure unit changed to ${!temperatureUnit ? 'C' : 'F'}`
        }))
    }

    const onFavoriteToggle = () => {
        dispatch(addCity({cityName}))
        dispatch(showNotification({
            type: 'success',
            description: `City successfully ${isInFavourites.length ? 'removed from' : 'saved to'} favourites`
        }))
    }

    return (
        <Card className={clsx(classes.card, {[classes.cardDark]: nightMode})} >
            <Box display="flex" justifyContent="space-between" p={1}>
                <Box display="flex" alignItems="center">
                    <Typography variant="body2">&deg;C</Typography>
                    <Switch className={classes.switch} size="small" checked={!temperatureUnit}
                            onChange={() => onTemperatureToggle()}
                    />
                    <Typography variant="body2">&deg;F</Typography>
                </Box>
                <IconButton className={classes.icon} onClick={() => onFavoriteToggle()}>
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
