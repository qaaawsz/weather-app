import {createContext, useEffect, useState} from 'react'

export const themes = {
    dark: 'dark',
    light: 'light',
}

export const ThemeContext = createContext({
    theme: themes.dark,
    changeTheme: (theme: any) => {
    },
})

const ThemeContextWrapper = (props: any) => {
    const [theme, setTheme] = useState(themes.light)

    const changeTheme = (theme: any) => {
        setTheme(theme)
    }

    useEffect(() => {
        switch (theme) {
            case themes.dark:
                document.body.classList.add('dark')
                break
            case themes.light:
                document.body.classList.remove('dark')
                break
            default:
                document.body.classList.remove('dark')
                break
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{theme: theme, changeTheme: changeTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextWrapper
