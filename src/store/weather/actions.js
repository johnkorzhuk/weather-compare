import getColor from './../../helpers/colors'
import weatherService from './../../services/weather'
import geocodeService from './../../services/geocode'

import { getSelectedUnit } from './../../store/weather/selectors'

// actions
export const FETCH_WEATHER = 'weather/FETCH_WEATHER'
export const FETCH_WEATHER_SUCCESS = 'weather/FETCH_WEATHER_SUCCESS'
export const FETCH_WEATHER_ERROR = 'weather/FETCH_WEATHER_ERROR'

export const DISMISS_NOTIFICATION = 'weather/DISMISS_NOTIFICATION'

export const UPDATE_CURR_LOC = 'weather/UPDATE_CURR_LOC'
export const DELETE_LOC = 'weather/DELETE_LOC'
export const GET_USER_LOC = 'weather/GET_USER_LOC'

export const TOGGLE_SIDEBAR = 'weather/TOGGLE_SIDEBAR'
export const TOGGLE_SELECTOR = 'weather/TOGGLE_SELECTOR'
export const TOGGLE_UNITS = 'weather/TOGGLE_UNITS'

export const UPDATE_GRAPH_SELECTOR = 'weather/UPDATE_GRAPH_SELECTOR'

export const fetchWeather = (...args) =>
  async dispatch => {
    const color = getColor()

    dispatch({ type: FETCH_WEATHER, data: { color } })

    try {
      let lat
      let lng
      let loc
      if (args.length === 1) {
        const [query] = args
        const { geometry, formatted_address } = await geocodeService.getLatLng(
          query
        )
        loc = formatted_address
        lat = geometry.location.lat
        lng = geometry.location.lng
      } else {
        const [latitude, longitude] = args
        lat = latitude
        lng = longitude
        loc = 'current location'
      }

      const forecast = await weatherService.getWeatherData(lat, lng)
      const data = {
        [loc]: {
          ...forecast.data,
          loc,
          color,
          legendKey: {
            [loc]: color
          }
        }
      }

      return dispatch({ type: FETCH_WEATHER_SUCCESS, data })
    } catch (e) {
      dispatch({
        type: FETCH_WEATHER_ERROR,
        data: { error: e, message: `oh no! something went wrong` }
      })
      setTimeout(() => dispatch({ type: DISMISS_NOTIFICATION }), 5000)
      console.error(e)
    }
  }

export const updateCurrLoc = loc =>
  (dispatch, getState) => {
    const { weather: { currLoc } } = getState()
    return currLoc === loc
      ? null
      : dispatch({ type: UPDATE_CURR_LOC, data: { loc } })
  }

export const deleteLoc = loc =>
  dispatch => {
    return dispatch({ type: DELETE_LOC, data: { loc } })
  }

export const toggleSideBar = () =>
  dispatch => {
    return dispatch({ type: TOGGLE_SIDEBAR })
  }

export const toggleSelector = selector =>
  dispatch => {
    return dispatch({ type: TOGGLE_SELECTOR, data: { selector } })
  }

export const toggleUnits = unit =>
  (dispatch, getState) => {
    const currUnit = getSelectedUnit(getState())
    return unit === currUnit ? null : dispatch({ type: TOGGLE_UNITS })
  }

export const updateGraphSelector = selector =>
  (dispatch, getState) => {
    const { graphSelector } = getState()
    return selector === graphSelector
      ? null
      : dispatch({ type: UPDATE_GRAPH_SELECTOR, data: { selector } })
  }
