import React, {useContext, useEffect} from 'react'
import {Grid, IconButton} from '@material-ui/core'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import HomeIcon from '@material-ui/icons/Home'
import {Link} from 'react-router-dom'
import useHeaderStyles from './useHeaderStyles'
import {useDispatch, useSelector} from 'react-redux'
import {toggleNightMode} from '../../redux/slices/interfaceSlice'
import {showNotification} from '../../redux/slices/notificationSlice'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import clsx from 'clsx'
import AutoComplete from '../autoComplete/AutoComplete'
import {themes, ThemeContext} from '../../theme/appTheme'

const Header: React.FC = () => {
    const {theme, changeTheme} = useContext(ThemeContext)
    const {nightMode} = useSelector((store: any) => store.interface)
    const dispatch = useDispatch()
    const classes = useHeaderStyles()

    useEffect(() => {
        nightMode && changeTheme(themes.dark)
    }, [])

    const onModeChange = () => {
        dispatch(toggleNightMode())
        changeTheme(nightMode ? themes.light : themes.dark)
        dispatch(showNotification({
            type: 'success',
            description: `Dark mode ${nightMode ? 'disabled' : 'enabled'}`
        }))
    }

    return (
        <Grid className={clsx(classes.header, {[classes.headerDark]: nightMode})} container alignItems="center">
            <Grid container item xs={1}>
                <IconButton
                    className={clsx(classes.icon, {[classes.iconDark]: nightMode})}
                    onClick={() => onModeChange()}
                >
                    {
                        nightMode
                            ? <Brightness7Icon className={clsx(classes.icon, {[classes.iconDark]: nightMode})}/>
                            : <Brightness4Icon className={clsx(classes.icon, {[classes.iconDark]: nightMode})}/>
                    }
                </IconButton>
            </Grid>
            <Grid container item xs={9} justifyContent="center" alignItems="flex-start">
                <AutoComplete/>
            </Grid>
            <Grid container item xs={2} justifyContent="flex-end">
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
