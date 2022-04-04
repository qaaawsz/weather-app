import React from 'react'
import {useSelector} from 'react-redux'
import {Grid, Typography, Box} from '@material-ui/core'
import FavouriteCard from '../../components/favouriteCard/FavouriteCard'
import Preloader from '../../components/preloader/Preloader'
import {FavouriteCardType} from '../../types/types'
import useThemeSwitch from '../../components/hooks/useThemeSwitch'
import clsx from 'clsx'

const FavoritePage: React.FC = () => {
    const {favourites} = useSelector((state: any) => state.favourites)
    const {loading} = useSelector((state: any) => state.interface)
    const {colorSwitcher} = useThemeSwitch()

    if (loading) return <Preloader/>

    if (!favourites.length) return (
        <Box className={clsx(colorSwitcher())} style={{overflowX:'hidden'}} my={3} textAlign="center">
            <Typography variant="h6">
                You haven't added any cities to favourite yet
            </Typography>
        </Box>
    )

    return (
        <>
            <Box className={clsx(colorSwitcher())} my={3} textAlign="center">
                <Typography variant="h4">Favourite locations</Typography>
            </Box>
            <Grid container spacing={3}>
                {favourites.map((location: FavouriteCardType) => (
                    <Grid container item xs={12} sm={6} md={4} lg={3} justifyContent="center" key={location.cityName}>
                        <FavouriteCard id={location.id} cityName={location.cityName}/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default FavoritePage
