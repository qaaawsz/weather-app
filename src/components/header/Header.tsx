import React from 'react'
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
import {themes, ThemeContext} from '../../theme/appTheme'
import clsx from 'clsx'
import AutoComplete from '../autoComplete/AutoComplete'

const Header: React.FC = () => {
    const {nightMode} = useSelector((store: any) => store.interface)
    const dispatch = useDispatch()
    const classes = useHeaderStyles()

    const onModeChange = (changeTheme: Function) => {
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
