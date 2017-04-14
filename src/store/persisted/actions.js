import { getSelectedUnit } from './../../store/weather/selectors'

import { saveState } from './../../helpers/localStorage'
import { UNITS_F_MPH, UNITS_C_KMPH } from './../../helpers/units'

// actions
export const TOGGLE_SELECTOR = 'weather/TOGGLE_SELECTOR'
export const TOGGLE_UNITS = 'weather/TOGGLE_UNITS'

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
