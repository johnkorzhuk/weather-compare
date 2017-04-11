import randomColor from 'randomcolor'
import weatherService from './../../services/weather'
import geocodeService from './../../services/geocode'

// constants
export const UNITS_F_MPH = 'F,mph'
export const UNITS_C_KMPH = 'C,kmph'
// actions
export const FETCH_WEATHER = 'weather/FETCH_WEATHER'
export const FETCH_WEATHER_SUCCESS = 'weather/FETCH_WEATHER_SUCCESS'
export const FETCH_WEATHER_ERROR = 'weather/FETCH_WEATHER_ERROR'

export const DISMISS_NOTIFICATION = 'weather/DISMISS_NOTIFICATION'

export const UPDATE_CURR_LOC = 'weather/UPDATE_CURR_LOC'
export const DELETE_LOC = 'weather/DELETE_LOC'

export const fetchWeather = query => async dispatch => {
  const color = randomColor()

  dispatch({ type: FETCH_WEATHER, data: { color } })

  try {
    const { geometry, formatted_address } = await geocodeService.getLatLng(query)
    const { lat, lng } = geometry.location
    const loc = formatted_address.toLowerCase()

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
    dispatch({ type: FETCH_WEATHER_ERROR, e })
    setTimeout(() => dispatch({ type: DISMISS_NOTIFICATION }), 5000)
    console.error(e)
  }
}

export const updateCurrLoc = loc => (dispatch, getState) => {
  const { weather: { currLoc } } = getState()

  return currLoc === loc ? null : dispatch({ type: UPDATE_CURR_LOC, data: { loc } })
}

export const deleteLoc = loc => dispatch => {
  return dispatch({ type: DELETE_LOC, data: { loc } })
}
