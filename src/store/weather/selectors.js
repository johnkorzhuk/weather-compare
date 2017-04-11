import { createSelector } from 'reselect'

import { MtoKM, FtoC } from './../../helpers/units'
import {
  UNITS_F_MPH,
  UNITS_C_KMPH
} from './actions'

const SELECTORS_FORMAT = {
  temperature: {
    readable: 'temperature',
    units: 'TEMP',
    unitSymbol: '°'
  },
  humidity: {
    readable: 'humidity',
    units: 'PERCENT',
    unitSymbol: '%'
  },
  cloudCover: {
    readable: 'cloud coverage',
    units: 'PERCENT',
    unitSymbol: '%'
  },
  dewPoint: {
    readable: 'dew point',
    units: 'TEMP',
    unitSymbol: '°'
  },
  ozone: {
    readable: 'ozone',
    units: 'DU',
    unitSymbol: 'DU'
  },
  precipProbability: {
    readable: 'precipitation %',
    units: 'PERCENT',
    unitSymbol: '%'
  },
  pressure: {
    readable: 'pressure',
    units: 'MB',
    unitSymbol: 'mb'
  },
  visibility: {
    readable: 'visibility',
    units: 'DISTANCE',
    unitSymbol: {
      [UNITS_F_MPH]: 'm',
      [UNITS_C_KMPH]: 'km'
    }
  },
  windSpeed: {
    readable: 'wind speed',
    units: 'DISTANCE',
    unitSymbol: {
      [UNITS_F_MPH]: 'mph',
      [UNITS_C_KMPH]: 'km/h'
    }
  },
  windBearing: {
    readable: 'wind bearing',
    units: 'DEGREE',
    unitSymbol: '°'
  }
}

const formatSelectors = (selector, selectorName, unit) => {
  switch (SELECTORS_FORMAT[selectorName].units) {
    case 'PERCENT':
      return `${Math.round(selector.value * 100)} ${SELECTORS_FORMAT[selectorName].unitSymbol}`

    case 'TEMP':
      const temp = unit === UNITS_F_MPH ? selector.value : FtoC(selector.value)
      return `${temp.toFixed(1)} ${SELECTORS_FORMAT[selectorName].unitSymbol}`

    case 'MB':
    case 'DU':
      return `${selector.value.toFixed(1)} ${SELECTORS_FORMAT[selectorName].unitSymbol}`

    case 'DISTANCE':
      const distance = unit === UNITS_F_MPH ? selector.value : MtoKM(selector.value)
      return `${distance.toFixed(2)} ${SELECTORS_FORMAT[selectorName].unitSymbol[unit]}`

    case 'DEGREE':
      return `${selector.value} ${SELECTORS_FORMAT[selectorName].unitSymbol}`

    default:
      console.error('Wrong type of unit passed to formatSelectors function')
      break
  }
}

const getData = state => state.weather.data
// rename this, its for the graph
const getSelector = state => state.weather.selector
const getSelectors = state => state.weather.selectors
const getSelectedUnit = state => Object.keys(state.weather.units).filter(unit => state.weather.units[unit])[0]
const getCurrLoc = state => state.weather.currLoc

export const getGraphData = createSelector(
  [ getData, getSelector ],
  (data, selector) => {
    let graphData = {}

    Object.keys(data).forEach(locKey => {
      const loc = data[locKey]

      loc.hourly.data.forEach(hour => {
        const time = hour.time * 1000

        if (graphData[time]) {
          graphData[time] = {
            ...graphData[time],
            [locKey]: hour[selector]
          }
        } else {
          graphData[time] = {
            [locKey]: hour[selector],
            time
          }
        }
      })
    })

    return graphData
  }
)

export const getLegendKeys = createSelector(
  [ getData ],
  data => {
    return Object.keys(data)
      .reduce((aggr, curr) => {
        aggr[curr] = data[curr].color
        return aggr
      }, {})
  }
)

const getSelectorsCurrData = createSelector(
  [ getSelectors, getData, getCurrLoc ],
  (selectors, data, currLoc) => {
    if (data[currLoc]) {
      return Object.keys(selectors)
        .reduce((aggr, curr) => {
          aggr[curr] = {
            selected: selectors[curr],
            value: data[currLoc].currently[curr],
            readable: SELECTORS_FORMAT[curr].readable
          }
          return aggr
        }, {})
    }
  }
)

export const getFormattedSelectors = createSelector(
  [ getSelectorsCurrData, getSelectedUnit ],
  (selectors, unit) => {
    if (selectors) {
      return Object.keys(selectors)
        .filter(selector => selectors[selector].selected)
        .reduce((aggr, curr) => {
          aggr[curr] = {
            value: formatSelectors(selectors[curr], curr, unit),
            readable: selectors[curr].readable
          }
          return aggr
        }, {})
    }
  }
)

export const getSettingsSelectors = createSelector(
  [ getSelectors ],
  selectors => {
    return Object.keys(selectors).map(item => {
      if (item !== 'temperature') {
        return {
          selector: item,
          readable: SELECTORS_FORMAT[item].readable,
          selected: selectors[item]
        }
      }
    }).filter(Boolean)
  }
)
