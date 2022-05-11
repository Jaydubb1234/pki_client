import { combineReducers } from 'redux'

import postReducer from './postsReducer'
import memberReducer from './membersReducer'

export default combineReducers({
    postReducer,
    memberReducer
})