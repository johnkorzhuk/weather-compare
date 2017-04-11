import {
  FETCH_WEATHER,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
  UPDATE_CURR_LOC,
  DELETE_LOC,
  DISMISS_NOTIFICATION,
  TOGGLE_SELECTOR,
  UNITS_F_MPH,
  UNITS_C_KMPH
} from './actions'

const INITIAL_STATE = {
  data: {},
  error: false,
  loading: false,
  currColor: null,
  currLoc: null,
  notification: null,
  selector: 'temperature',
  selectors: {
    humidity: true,
    cloudCover: true,
    dewPoint: true,
    ozone: true,
    precipProbability: true,
    pressure: true,
    visibility: false,
    windSpeed: true,
    windBearing: true,
    temperature: true
  },
  units: {
    [UNITS_F_MPH]: false,
    [UNITS_C_KMPH]: true
  }
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
      const currLoc = locs[indexOfActionData === 0 ? 1 : indexOfActionData - 1] || null

      return {
        ...state,
        currLoc,
        currColor: state.data[currLoc] ? state.data[currLoc].color : null,
        data: locs.filter(loc => loc !== action.data.loc)
          .reduce((aggr, curr) => {
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
      return {
        ...state,
        data: {
          ...state.data,
          ...action.data
        },
        loading: false,
        currLoc: Object.keys(action.data)[0]
      }

    case FETCH_WEATHER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.e,
        currColor: state.data[state.currLoc] ? state.data[state.currLoc].color : null,
        notification: {
          type: FETCH_WEATHER_ERROR,
          message: `couldn't get weather data`
        }
      }

    case TOGGLE_SELECTOR:
      return {
        ...state,
        selectors: {
          ...state.selectors,
          [action.data.selector]: !state.selectors[action.data.selector]
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

