import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../reducers'

const enhancers = compose(
  typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'
    ? window.devToolsExtension && window.devToolsExtension()
    : f => f
)

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

export default initialState => createStoreWithMiddleware(rootReducer, initialState, enhancers)
