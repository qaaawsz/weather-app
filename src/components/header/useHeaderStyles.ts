import {makeStyles} from '@material-ui/core/styles'
import {
    GRAY_DARK, GRAY_DARKER, GRAY_LIGHT,
    GRAY_TEXT_DARK, GRAY_TEXT_LIGHT
} from '../../global/colorsPalette'

const useHeaderStyles = makeStyles((theme) => ({
    header: {
        height: 70,
        padding: 15,
        borderBottom: `1px solid ${GRAY_TEXT_DARK}`,
    },
    headerDark: {
        color: GRAY_TEXT_LIGHT,
        borderBottom: `1px solid ${GRAY_TEXT_LIGHT}`
    },
    headerForm: {
        maxWidth: 800,
        width: '100%',
        height: 55,
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
    },
    searchBox: {
        height: 55,
        paddingLeft: 5,
        color: GRAY_TEXT_DARK,
    },
    searchBoxDark: {
        color: GRAY_TEXT_LIGHT,
    },
    inValid: {
        borderColor: 'red !important',
    },
    helperText: {
        fontSize: '0.67rem',
        letterSpacing: -0.5,
    },
    headerButton: {
        padding: '2.5px 0px',
        marginLeft: 10,
        color: GRAY_TEXT_DARK,
        border: `1px solid ${GRAY_TEXT_DARK}`,
        '& :hover': {
            color: GRAY_DARK,
            borderColor: GRAY_DARK,
        },
    },
    headerButtonDark: {
        color: GRAY_TEXT_LIGHT,
        border: `1px solid ${GRAY_TEXT_LIGHT}`,
        '& :hover': {
            color: GRAY_LIGHT,
            borderColor: GRAY_LIGHT,
        },
    },
    icon: {
        margin: 0,
        padding: 0,
        color: GRAY_TEXT_DARK,
        fontSize: '2rem',
        transition: theme.transitions.create(['color'], {
            duration: theme.transitions.duration.short,
        }),
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.7rem',
        },
        '&:hover': {
            color: GRAY_DARK,
        },
    },
    iconDark: {
        color: GRAY_TEXT_LIGHT,
        '&:hover': {
            color: GRAY_LIGHT,
        },
    },
    suggestions: {
        position: 'relative',
        minWidth: '100%',
        overflowY: 'auto',
        zIndex: 9,
        padding: '0px !important',
        background: GRAY_TEXT_LIGHT,
    },
    suggestionsDark: {
        background: GRAY_DARKER,
    },
    showSuggestions: {
        height: 200,
    },
}))

export default useHeaderStyles
