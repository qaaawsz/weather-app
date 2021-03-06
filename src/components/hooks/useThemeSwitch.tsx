import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {GRAY_TEXT_LIGHT, GRAY_TEXT_DARK, GRAY_LIGHTER, GRAY_DARK} from '../../global/colorsPalette'

const useThemeSwitch = () => {
    const {nightMode} = useSelector((store: any) => store.interface)

    const classes = makeStyles((theme) => ({
        lightMode: {
            color: GRAY_TEXT_DARK,
            background: GRAY_LIGHTER,
        },
        darkMode: {
            color: GRAY_TEXT_LIGHT,
            background: GRAY_DARK,
        },
    }))()

    const colorSwitcher = (specialClass?: string) => {
        return {
            [classes.darkMode]: nightMode,
            [classes.lightMode]: nightMode,
        }
    }

    return {colorSwitcher}
}

export default useThemeSwitch
