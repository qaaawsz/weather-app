import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import store, {persistor} from './redux/store'
import './styles.css'
import Preloader from './components/preloader/Preloader'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<Preloader/>} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
