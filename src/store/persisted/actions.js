import { saveState } from './../../helpers/localStorage'
import { UNITS_F_MPH, UNITS_C_KMPH } from './../../helpers/units'
import geolocation from './../../helpers/geolocation'
import getColor from './../../helpers/colors'
import weatherService from './../../services/weather'

import { getSelectedUnit } from './../../store/weather/selectors'
import {
  FETCH_WEATHER,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
  DISMISS_NOTIFICATION,
  UPDATE_NOTIFICATION
} from './../weather/actions'

// actions
export const TOGGLE_SELECTOR = 'persisted/TOGGLE_SELECTOR'
export const TOGGLE_UNITS = 'persisted/TOGGLE_UNITS'
export const UPDATE_GEOLOC_PERMISSION = 'persisted/UPDATE_GEOLOC_PERMISSION'

export const toggleSelector = selector =>
  (dispatch, getState) => {
    dispatch({ type: TOGGLE_SELECTOR, data: { selector } })
    const { persisted } = getState()
    const newState = {
      persisted: {
        ...persisted,
        selectors: {
          ...persisted.selectors,
          [selector]: !persisted.selectors[selector]
        }
      }
    }
    saveState(newState)
  }

export const toggleUnits = unit =>
  (dispatch, getState) => {
    const state = getState()
    const currUnit = getSelectedUnit(state)
    if (unit !== currUnit) {
      dispatch({ type: TOGGLE_UNITS })
      const { persisted } = state
      const newState = {
        persisted: {
          ...persisted,
          units: {
            ...persisted.units,
            [UNITS_F_MPH]: !persisted.units[UNITS_F_MPH],
            [UNITS_C_KMPH]: !persisted.units[UNITS_C_KMPH]
          }
        }
      }
      saveState(newState)
    }
  }

export const getUserLoc = () =>
  async (dispatch, getState) => {
    const color = getColor()
    const state = getState()

    dispatch({ type: FETCH_WEATHER, data: { color } })

    try {
      const { coords: { latitude, longitude } } = await geolocation()
      dispatch({
        type: UPDATE_GEOLOC_PERMISSION,
        data: { userHasGrantedGeoLocPermission: true }
      })

      const forecast = await weatherService.getWeatherData(latitude, longitude)
      const loc = 'current location'
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

      dispatch({ type: FETCH_WEATHER_SUCCESS, data })
      const { persisted } = state
      const newState = {
        persisted: {
          ...persisted,
          userHasGrantedGeoLocPermission: true
        }
      }
      saveState(newState)
    } catch (e) {
      if (e.code === 1) {
        dispatch({
          type: FETCH_WEATHER_ERROR,
          data: { error: e, message: `unable to retrieve your location` }
        })
      } else {
        dispatch({
          type: FETCH_WEATHER_ERROR,
          data: { error: e, message: `oh no! something went wrong` }
        })
      }

      setTimeout(() => dispatch({ type: DISMISS_NOTIFICATION }), 5000)
      console.error(e)
    }
  }
