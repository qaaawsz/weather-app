import {useEffect, useState} from 'react'

const useWindowSize = () => {
    const [screenSize, getDimension] = useState(window.innerWidth)

    const setDimension = () => getDimension(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', setDimension)

        return (() => {
            window.removeEventListener('resize', setDimension)
        })
    }, [screenSize])

    return {screenSize}
}

export default useWindowSize
