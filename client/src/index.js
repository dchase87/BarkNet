import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import App from './components/App'
import reducers from './reducers'
import { AUTH_USER } from './actions/types'
import { composeWithDevTools } from 'redux-devtools-extension'
import './App.css'
import './index.css'

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(reduxThunk)
))

const token = localStorage.getItem('token')
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state to authenticated=true
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('#root'))
