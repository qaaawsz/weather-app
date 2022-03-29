import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import useHeaderStyles from '../header/useHeaderStyles'
import {setSearchRequest, showTextFieldError} from '../../redux/actionCreator'
import {searchForCity} from '../../utilityFunctions'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {List, ListItem, ListItemText, TextField} from '@material-ui/core'
import clsx from 'clsx'

const AutoComplete: React.FC = () => {
    const {loading: inputLoading, nightMode} = useSelector((store: any) => store.ui)
    const {searchText, textFieldError} = useSelector((store: any) => store.currentSearch)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cityNamePattern = /^\S[A-Za-z\s,]{1,100}$/

    const classes = useHeaderStyles()

    const handleChange = (searchText: string) => {
        dispatch(setSearchRequest(searchText, cityNamePattern.test(searchText)))
        dispatch(showTextFieldError(false))
    }

    const handleSubmit = (city: string) => {
        dispatch(setSearchRequest(city, cityNamePattern.test(city)))
        if (!cityNamePattern.test(city)) {
            dispatch(showTextFieldError(true))
            return
        }
        navigate('/')
        !inputLoading && searchForCity(dispatch, city)
    }

    return (
        <PlacesAutocomplete
            value={searchText}
            onChange={handleChange}
            onSelect={handleSubmit}
            searchOptions={{types: ['(cities)']}}
        >
            {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                <div
                    className={classes.headerForm}
                >
                    <div className={classes.inputWrapper}>
                        <TextField
                            {...getInputProps()}
                            className={clsx(classes.searchBox, {
                                [classes.searchBoxDark]: nightMode,
                                [classes.inValid]: textFieldError
                            })}
                            type="text"
                            placeholder="Search for cities"
                            fullWidth
                            value={searchText}
                            disabled={inputLoading}
                            error={textFieldError}
                            helperText={
                                textFieldError &&
                                <span className={classes.helperText}>
                                Latin letters, spaces & commas allowed, length 2 to 100
                            </span>
                            }
                        />
                    </div>
                    <List className={clsx(classes.suggestions,
                        {[classes.suggestionsDark]: nightMode, [suggestions.length]: classes.showSuggestions})}
                          component="div">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            return (
                                <ListItem {...getSuggestionItemProps(suggestion)} button>
                                    <ListItemText primary={suggestion.description}/>
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            )}
        </PlacesAutocomplete>
    )
}

export default AutoComplete
