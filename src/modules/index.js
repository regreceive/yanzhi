import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import crop from './crop'

export default combineReducers({
  routing: routerReducer,
  crop,
})
