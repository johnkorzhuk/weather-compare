import { getSelectedUnit } from './../../store/weather/selectors'

import { saveState } from './../../helpers/localStorage'
import { UNITS_F_MPH, UNITS_C_KMPH } from './../../helpers/units'
import geolocation from './../../helpers/geolocation'
import getColor from './../../helpers/colors'
import weatherService from './../../services/weather'

import {
  FETCH_WEATHER,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
  DISMISS_NOTIFICATION
} from './../weather/actions'

// actions
export const TOGGLE_SELECTOR = 'persisted/TOGGLE_SELECTOR'
export const TOGGLE_UNITS = 'persisted/TOGGLE_UNITS'
export const UPDATE_USER_LOC = 'persisted/UPDATE_USER_LOC'

export const toggleSelector = selector =>
  (dispatch, getState) => {
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
    dispatch({ type: TOGGLE_SELECTOR, data: { selector } })
    saveState(newState)
  }

export const toggleUnits = unit =>
  (dispatch, getState) => {
    const state = getState()
    const currUnit = getSelectedUnit(state)
    if (unit !== currUnit) {
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
      dispatch({ type: TOGGLE_UNITS })
      saveState(newState)
    }
  }

export const getUserLoc = () =>
  async (dispatch, getState) => {
    const color = getColor()
    const state = getState()

    if (!state.persisted.userLoc) {
      dispatch({ type: FETCH_WEATHER, data: { color } })

      try {
        const { coords: { latitude, longitude } } = await geolocation()
        dispatch({ type: UPDATE_USER_LOC, data: { latitude, longitude } })

        const forecast = await weatherService.getWeatherData(
          latitude,
          longitude
        )
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
            userLoc: {
              latitude,
              longitude
            }
          }
        }
        saveState(newState)
      } catch (e) {
        dispatch({ type: FETCH_WEATHER_ERROR, e })
        setTimeout(() => dispatch({ type: DISMISS_NOTIFICATION }), 5000)
        console.error(e)
      }
    }
  }
