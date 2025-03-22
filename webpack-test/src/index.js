import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'
import './index.css'
import Promise from 'promise-polyfill'

if (!window.Promise)
{
    window.Promise = Promise
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)