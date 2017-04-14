import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

import { loadState } from './../helpers/localStorage'

const persistedState = loadState()

let middleware = [thunk]

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger]
}

const enhancers = compose(
  applyMiddleware(...middleware),
  window.devToolsExtension && process.env.NODE_ENV !== 'production'
    ? window.devToolsExtension()
    : f => f
)

const store = createStore(rootReducer, persistedState, enhancers)

export default store
