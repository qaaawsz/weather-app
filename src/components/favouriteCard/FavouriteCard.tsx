import {Card, CardActions, CardHeader, IconButton} from '@material-ui/core'
import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import {useDispatch, useSelector} from 'react-redux'
import {showNotification} from '../../redux/slices/notificationSlice'
import useFavoriteCardStyles from './useFavoriteCardStyles'
import {FavouriteCardType} from '../../types/types'
import {useNavigate} from 'react-router-dom'
import clsx from 'clsx'
import {searchForCity} from '../../utilityFunctions'
import {removeCity} from '../../redux/slices/favouritesSlice'

const FavouriteCard: React.FC<FavouriteCardType> = ({id, cityName}) => {
    const {nightMode} = useSelector((store: any) => store.interface)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useFavoriteCardStyles()

    return (
        <Card className={clsx(classes.favoriteCard, {[classes.favoriteCardDark]: nightMode})} elevation={0}>
            <CardHeader
                className={classes.cardHeader}
                title={cityName}
                onClick={() => {
                    navigate('/')
                    searchForCity(dispatch, cityName)
                }}
            />
            <CardActions className={classes.cardBottom} disableSpacing>
                <IconButton onClick={() => {
                    dispatch(removeCity({id}))
                    dispatch(showNotification({
                        show: true,
                        type: 'success',
                        description: `City successfully removed from favourites`
                    }))
                }}>
                    <FavoriteIcon className={classes.icon}/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default FavouriteCard
