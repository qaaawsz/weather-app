import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import configureStore from './redux/store'
import ThemeContextWrapper from './theme/appTheme'
import './styles.css'

ReactDOM.render(
    <ThemeContextWrapper>
        <React.StrictMode>
            <Provider store={configureStore}>
                <App />
            </Provider>
        </React.StrictMode>
    </ThemeContextWrapper>,
    document.getElementById('root')
)
