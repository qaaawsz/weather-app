import {createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        show: false,
        type: '',
        description: '',
    },
    reducers: {
        showNotification(state, action) {
            state.show = true
            state.type = action.payload.type
            state.description = action.payload.description
        },
        closeNotification(state) {
            state.show = false
        },
    }
})

export const {showNotification, closeNotification} = notificationSlice.actions
export default notificationSlice.reducer
