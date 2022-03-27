import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import store from './redux/store'
import ThemeContextWrapper from './theme/appTheme'
import './styles.css'

ReactDOM.render(
    <ThemeContextWrapper>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </ThemeContextWrapper>,
    document.getElementById('root')
)
