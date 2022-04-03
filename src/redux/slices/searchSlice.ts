import {createSlice} from '@reduxjs/toolkit'

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchText: '',
        isValid: false,
        textFieldError: false,
    },
    reducers: {
        setSearchRequest(state, action) {
            state.searchText = action.payload.searchText
            state.isValid = action.payload.isValid
        },
        showTextFieldError(state, action) {
           state.textFieldError = action.payload.textFieldError
        },
    },
})

export const {setSearchRequest, showTextFieldError} = searchSlice.actions
export default searchSlice.reducer
