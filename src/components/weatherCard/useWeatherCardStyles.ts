import {makeStyles} from '@material-ui/core/styles'
import {
    FAVOURITE_SAVED,
    FAVOURITE_SAVED_HOVER,
    FAVOURITE_UNSAVED,
    FAVOURITE_UNSAVED_HOVER, GRAY_DARKER, GRAY_LIGHT, GRAY_TEXT_DARK, GRAY_TEXT_LIGHT
} from '../../global/colorsPalette'

const useWeatherCardStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 400,
        width: '100%',
        margin: '20px 10px',
        textAlign: 'center',
        background: GRAY_LIGHT,
        color: GRAY_TEXT_DARK,
        border: `1px solid ${GRAY_TEXT_DARK}`,
    },
    cardDark: {
        color: GRAY_TEXT_LIGHT,
        background: GRAY_DARKER,
        border: `1px solid ${GRAY_TEXT_LIGHT}`,
    },
    switch: {
        '& .MuiSwitch-track': {
            background: GRAY_TEXT_LIGHT,
        },
        '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
            background: GRAY_TEXT_DARK,
        },
        '& .Mui-checked': {
            color: '#fafafa',
        },
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingTop: 0,
    },
    temperatureBlock: {
        fontWeight: 'bolder',
        letterSpacing: -5,
    },
    separator: {
        letterSpacing: 3,
    },
    description: {
        fontWeight: 'bold',
    },
    minMax: {
        letterSpacing: -0.5,
    },
    cardDate: {},
    icon: {
        padding: 0,
        margin: 0,
    },
    saved: {
        color: FAVOURITE_SAVED,
        '& :hover': {
            color: FAVOURITE_SAVED_HOVER,
        },
    },
    unsaved: {
        color: FAVOURITE_UNSAVED,
        '& :hover': {
            color: FAVOURITE_UNSAVED_HOVER,
        },
    },
    dailyWrapper: {
        flexWrap: 'nowrap',
    },
}))

export default useWeatherCardStyles
