import {Card, CardActions, CardHeader, IconButton} from '@material-ui/core'
import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import {useDispatch, useSelector} from 'react-redux'
import {removeCity, showNotification} from '../../redux/actionCreator'
import useFavoriteCardStyles from './useFavoriteCardStyles'
import {FavouriteCardType} from '../../types/types'
import {useNavigate} from 'react-router-dom'
import clsx from 'clsx'
import {searchForCity} from '../../utilityFunctions'

const FavouriteCard: React.FC<FavouriteCardType> = ({id, cityName}) => {
    const {nightMode} = useSelector((store: any) => store.ui)
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
                    dispatch(showNotification('success', 'City successfully removed from favourites'))
                    dispatch(removeCity(id))
                }}>
                    <FavoriteIcon className={classes.icon}/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default FavouriteCard
