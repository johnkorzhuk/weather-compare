import { combineReducers } from 'redux'
import weather from './weather/reducer'
import persisted from './persisted/reducer'

export default combineReducers({
  weather,
  persisted
})
