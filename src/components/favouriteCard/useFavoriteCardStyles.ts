import {makeStyles} from '@material-ui/core/styles'
import {
    FAVOURITE_SAVED_HOVER,
    FAVOURITE_SAVED, GRAY_LIGHT, GRAY_DARK, GRAY_TEXT_DARK, GRAY_TEXT_LIGHT, GRAY_LIGHTER, GRAY_DARKER
} from '../../global/colorsPalette'

const useFavoriteCardStyles = makeStyles((theme) => ({
    favoriteCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: 300,
        maxHeight: 380,
        width: '100%',
        height: 380,
        cursor: 'pointer',
        color: GRAY_TEXT_DARK,
        background: `${GRAY_LIGHT} url(/assets/citybg.png)`,
        backgroundSize: 'cover',
        border: `1px solid ${GRAY_TEXT_DARK}`,
        transition: theme.transitions.create(['background'], {
            duration: theme.transitions.duration.standard,
        }),
        '&:hover': {
            background: `${GRAY_LIGHTER} url(/assets/citybg.png)`,
            backgroundSize: 'cover',
        },
    },
    favoriteCardDark: {
        color: GRAY_TEXT_LIGHT,
        background: `${GRAY_DARK} url(/assets/citybg.png) !important`,
        backgroundSize: 'cover !important',
        border: `1px solid ${GRAY_TEXT_LIGHT}`,
        '&:hover': {
            background: `${GRAY_DARKER} url(/assets/citybg.png) !important`,
            backgroundSize: 'cover !important',
        },
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        textAlign: 'center',
        height: '100%',
    },
    cardBottom: {
        display: 'flex',
        justifyContent: 'end',
    },
    icon: {
        color: FAVOURITE_SAVED,
        transition: theme.transitions.create(['color'], {
            duration: theme.transitions.duration.short,
        }),
        '&:hover': {
            color: FAVOURITE_SAVED_HOVER,
        },
    },
}))

export default useFavoriteCardStyles
