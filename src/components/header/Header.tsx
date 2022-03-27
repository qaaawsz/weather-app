import React from 'react'
import {
    Grid,
    TextField,
    Button,
    IconButton,
} from '@material-ui/core'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import HomeIcon from '@material-ui/icons/Home'
import {Link, useNavigate} from 'react-router-dom'
import useHeaderStyles from './useHeaderStyles'
import {useDispatch, useSelector} from 'react-redux'
import {
    setSearchRequest, showNotification, showTextFieldError,
    switchMode,
} from '../../redux/actionCreator'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import {themes, ThemeContext} from '../../theme/appTheme'
import clsx from 'clsx'
import {searchForCity} from '../../utilityFunctions'
import useWindowSize from '../hooks/useWindowSize'

const Header: React.FC = () => {
    const {loading, nightMode} = useSelector((store: any) => store.ui)
    const {searchText, isValid, textFieldError} = useSelector((store: any) => store.currentSearch)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {screenSize} = useWindowSize()
    const classes = useHeaderStyles()
    const cityNamePattern = /^\S[A-Za-z\s]{1,50}$/

    const onModeChange = (changeTheme: Function) => {
        dispatch(switchMode(nightMode))
        changeTheme(nightMode ? themes.light : themes.dark)
        dispatch(showNotification('success', `Dark mode ${nightMode ? 'disabled' : 'enabled'}`))
    }

    const onSubmit = (e: any) => {
        e.type === 'submit' && e.preventDefault()
        if (!isValid) {
            dispatch(showTextFieldError(true))
        } else {
            navigate('/')
            isValid && !loading && searchForCity(dispatch, searchText)
        }
    }

    return (
        <Grid className={clsx(classes.header, {[classes.headerDark]: nightMode})} container alignItems="center">
            <Grid container item xs={1}>
                <ThemeContext.Consumer>
                    {({changeTheme}) => (
                        <IconButton
                            className={clsx(classes.icon, {[classes.iconDark]: nightMode})}
                            onClick={() => onModeChange(changeTheme)}
                        >
                            {
                                nightMode
                                    ? <Brightness7Icon className={clsx(classes.icon, {[classes.iconDark]: nightMode})}/>
                                    : <Brightness4Icon className={clsx(classes.icon, {[classes.iconDark]: nightMode})}/>
                            }
                        </IconButton>
                    )}
                </ThemeContext.Consumer>
            </Grid>
            <Grid container item xs={9} md={10} justifyContent="center" alignItems="flex-start">
                <form
                    className={classes.headerForm}
                    onSubmit={onSubmit}>
                    <TextField
                        className={clsx(classes.searchBox, {
                            [classes.searchBoxDark]: nightMode,
                            [classes.inValid]: textFieldError
                        })}
                        type="text"
                        placeholder="Search for cities"
                        fullWidth
                        value={searchText}
                        onChange={(e) => {
                            dispatch(setSearchRequest(e.target.value, cityNamePattern.test(e.target.value)))
                            dispatch(showTextFieldError(false))

                        }}
                        disabled={loading}
                        error={textFieldError}
                        helperText={
                            textFieldError &&
                            <span style={{fontSize: '0.7rem', letterSpacing: 0}}>Letters & spaces allowed, min length 2, max length 50</span>
                        }
                    />
                    { screenSize > 500 &&
                        <Button
                            className={clsx(classes.headerButton, {[classes.headerButtonDark]: nightMode})}
                            disabled={loading}
                            onClick={onSubmit}
                            variant="outlined" size="small"
                        >
                            Search
                        </Button>
                    }
                </form>
            </Grid>
            <Grid container item xs={2} md={1} justifyContent="flex-end">
                <Link to="/">
                    <HomeIcon className={clsx(classes.icon, {[classes.iconDark]: nightMode})}/>
                </Link>
                <Link to="/favourite">
                    <BookmarkIcon className={clsx(classes.icon, {[classes.iconDark]: nightMode})}/>
                </Link>
            </Grid>
        </Grid>
    )
}

export default Header
