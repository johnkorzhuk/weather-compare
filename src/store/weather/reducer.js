import {
  FETCH_WEATHER,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
  UPDATE_CURR_LOC,
  DELETE_LOC,
  DISMISS_NOTIFICATION,
  UPDATE_NOTIFICATION,
  TOGGLE_SIDEBAR,
  UPDATE_GRAPH_SELECTOR
} from './actions'

const INITIAL_STATE = {
  data: {},
  error: false,
  loading: false,
  currColor: null,
  currLoc: null,
  notification: null,
  graphSelector: 'temperature',
  sidebar: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CURR_LOC:
      const { loc } = action.data

      return {
        ...state,
        currLoc: loc,
        currColor: state.data[loc].color,
        error: null
      }

    case DELETE_LOC:
      const locs = Object.keys(state.data)
      const indexOfActionData = locs.indexOf(action.data.loc)
      const currLoc = locs[
        indexOfActionData === 0 ? 1 : indexOfActionData - 1
      ] || null

      return {
        ...state,
        currLoc,
        currColor: state.data[currLoc] ? state.data[currLoc].color : null,
        data: locs.filter(loc => loc !== action.data.loc).reduce((
          aggr,
          curr
        ) => {
          aggr[curr] = state.data[curr]
          return aggr
        }, {}),
        error: null
      }

    case FETCH_WEATHER:
      return {
        ...state,
        loading: true,
        currColor: action.data.color,
        error: null
      }

    case FETCH_WEATHER_SUCCESS:
      const newLoc = Object.keys(action.data)[0]

      return {
        ...state,
        data: {
          ...state.data,
          ...action.data
        },
        loading: false,
        currLoc: newLoc,
        currColor: action.data[newLoc].color
      }

    case FETCH_WEATHER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.data.error,
        notification: {
          type: FETCH_WEATHER_ERROR,
          message: action.data.message
        }
      }

    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: !state.sidebar
      }

    case UPDATE_GRAPH_SELECTOR:
      return {
        ...state,
        graphSelector: action.data.selector
      }

    case DISMISS_NOTIFICATION:
      return {
        ...state,
        error: null,
        loading: false,
        currColor: state.data[state.currLoc]
          ? state.data[state.currLoc].color
          : null,
        notification: null
      }

    case UPDATE_NOTIFICATION:
      return {
        ...state,
        notification: {
          type: FETCH_WEATHER_ERROR,
          message: action.data.message
        }
      }

    default:
      return state
  }
}
