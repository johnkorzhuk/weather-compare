import {
  TOGGLE_SELECTOR,
  TOGGLE_UNITS,
  UPDATE_GEOLOC_PERMISSION
} from './actions'

import { UNITS_F_MPH, UNITS_C_KMPH } from './../../helpers/units'

const INITIAL_STATE = {
  selectors: {
    humidity: true,
    cloudCover: true,
    dewPoint: false,
    ozone: false,
    precipProbability: true,
    pressure: false,
    visibility: false,
    windSpeed: false,
    windBearing: false,
    temperature: true
  },
  units: {
    [UNITS_F_MPH]: true,
    [UNITS_C_KMPH]: false
  },
  userHasGrantedGeoLocPermission: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SELECTOR:
      console.log(!state.selectors[action.data.selector])
      return {
        ...state,
        selectors: {
          ...state.selectors,
          [action.data.selector]: !state.selectors[action.data.selector]
        }
      }

    case TOGGLE_UNITS:
      return {
        ...state,
        units: {
          ...state.units,
          [UNITS_F_MPH]: !state.units[UNITS_F_MPH],
          [UNITS_C_KMPH]: !state.units[UNITS_C_KMPH]
        }
      }

    case UPDATE_GEOLOC_PERMISSION:
      return {
        ...state,
        userHasGrantedGeoLocPermission: action.data.userHasGrantedGeoLocPermission
      }

    default:
      return state
  }
}
