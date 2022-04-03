import {Snackbar} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {closeNotification} from '../../redux/slices/notificationSlice'

const Notification: React.FC = () => {
    const {show, type, description} = useSelector((state: any) => state.notification)
    const dispatch = useDispatch()

    //Cleanup function added in case user will trigger a lot of notifications in a short period of time
    useEffect(() => {
        let notification: ReturnType<typeof setTimeout>
        if (show) {
            notification = setTimeout(() => {
                dispatch(closeNotification())
            }, 1000)
        }
        return () => {
            clearTimeout(notification)
        }
    }, [show])

    return (
        <>
            <Snackbar open={show} onClick={() => dispatch(closeNotification())}>
                <Alert variant="filled" severity={type}>
                    {description}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Notification
