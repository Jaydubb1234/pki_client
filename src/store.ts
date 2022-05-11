import { applyMiddleware, createStore } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
//import promise from 'redux-promise-middleware'

//import postReducer from './reducers'
//import memberReducer from './reducers'
import reducers from './reducers'

//const middleware = applyMiddleware(promise(), thunk, logger)
const middleware = applyMiddleware(thunk, logger)

export default createStore(reducers, middleware)





//const middleware = applyMiddleware(thunk)(createStore)

//export const store = middleware(postReducer)