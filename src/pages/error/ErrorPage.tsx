import {Box, Typography} from '@material-ui/core'
import React from 'react'
import clsx from 'clsx'
import useThemeSwitch from '../../components/hooks/useThemeSwitch'

const ErrorPage = () => {
    const {colorSwitcher} = useThemeSwitch()

    return (
        <Box className={clsx(colorSwitcher())} my={3} textAlign="center">
            <Typography variant="h4">Page not found =O</Typography>
        </Box>
    )
}

export default ErrorPage
