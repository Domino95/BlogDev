import React from 'react'
import reactDom from 'react-dom'
import App from './app'
import './styles/index.scss'
import { DataProvider } from './api/globalState'


reactDom.render(
    <DataProvider>
        <App />
    </DataProvider>,
    document.getElementById('root'))
