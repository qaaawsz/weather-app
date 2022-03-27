import {makeStyles} from '@material-ui/core/styles'
import {
    GRAY_DARK, GRAY_LIGHT,
    GRAY_TEXT_DARK, GRAY_TEXT_LIGHT
} from '../../global/colorsPalette'

const useHeaderStyles = makeStyles((theme) => ({
    header: {
        height: 80,
        padding: '15px 20px',
        borderBottom: `1px solid ${GRAY_TEXT_DARK}`,
        [theme.breakpoints.down('xs')]: {
            padding: '15px 10px',
        },
    },
    headerDark: {
        color: GRAY_TEXT_LIGHT,
        borderBottom: `1px solid ${GRAY_TEXT_LIGHT}`
    },
    headerForm: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        maxWidth: 800,
        width: '100%',
        height: 32,
    },
    searchBox: {
        color: GRAY_TEXT_DARK,
    },
    searchBoxDark: {
        color: GRAY_TEXT_LIGHT,
    },
    inValid: {
        borderColor: 'red !important'
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
}))

export default useHeaderStyles
