import {
  FETCH_WEATHER,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
  UPDATE_CURR_LOC,
  DELETE_LOC,
  DISMISS_NOTIFICATION
} from './actions'

const INITIAL_STATE = {
  data: {},
  error: false,
  loading: false,
  legendKeys: {},
  currColor: null,
  currLoc: null,
  notification: null,
  selector: 'temperature'
}

const legendKeys = (state, action) => {
  switch (action.type) {
    case FETCH_WEATHER_SUCCESS:
      const newLoc = action.data[Object.keys(action.data)[0]]
      return {
        ...state,
        [newLoc.loc]: newLoc.color
      }

    default:
      return state
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CURR_LOC:
      return {
        ...state,
        currLoc: action.data.loc,
        currColor: state.legendKeys[action.data.loc],
        error: null
      }

    case DELETE_LOC:
      const locs = Object.keys(state.data)
      const indexOfActionData = locs.indexOf(action.data.loc)
      const currLoc = locs[indexOfActionData === 0 ? 1 : indexOfActionData - 1]
      return {
        ...state,
        currLoc,
        currColor: state.legendKeys[currLoc],
        data: locs.filter(loc => loc !== action.data.loc)
          .reduce((aggr, curr) => {
            aggr[curr] = state.data[curr]
            return aggr
          }, {}),
        legendKeys: Object.keys(state.legendKeys)
          .filter(key => key !== action.data.loc)
          .reduce((aggr, curr) => {
            aggr[curr] = state.legendKeys[curr]
            return aggr
          }, {}),
        error: null
      }

    case FETCH_WEATHER:
      return {
        ...state,
        loading: true,
        currColor: action.data.color,
        error: null,
        notification: {
          type: FETCH_WEATHER,
          message: 'loading...'
        }
      }

    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        legendKeys: {
          ...legendKeys(state.legendKeys, action)
        },
        data: {
          ...state.data,
          ...action.data
        },
        loading: false,
        currLoc: Object.keys(action.data)[0],
        notification: null
      }

    case FETCH_WEATHER_ERROR:
      return {
        ...state,
        loading: false,
        error: {
          message: 'unable to get location',
          error: action.e
        },
        currColor: state.legendKeys[state.currLoc],
        notification: {
          type: FETCH_WEATHER_ERROR,
          message: `couldn't get weather data`
        }
      }

    case DISMISS_NOTIFICATION:
      return {
        ...state,
        error: null,
        loading: false,
        notification: null
      }

    default:
      return state
  }
}

