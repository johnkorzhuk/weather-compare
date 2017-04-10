import { createSelector } from 'reselect'

import { MtoKM, FtoC } from './../../helpers/units'

const SELECTORS = {
  humidity: {
    readable: 'humidity',
    units: '%'
  },
  cloudCoverage: {
    readable: 'cloud coverage',
    units: '%'
  },
  dewPoint: {
    readable: 'dew point',
    units: 'temp'
  },
  ozone: {
    readable: 'ozone',
    units: 'DU'
  },
  precipProbability: {
    readable: 'precipitation %',
    units: '%'
  },
  pressure: {
    readable: 'pressure',
    units: 'mb'
  },
  visibility: {
    readable: 'visibility',
    units: 'm|km'
  },
  windSpeed: {
    readable: 'wind speed',
    units: 'm|km/h'
  },
  windBearing: {
    readable: 'wind bearing',
    units: '°'
  }
}

const getData = state => state.weather.data
const getSelector = state => state.weather.selector
const getSelectors = state => state.weather.selectors
const getUnits = state => state.weather.units

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

export const getReadableSelectors = createSelector(
  [ getSelectors, getUnits ],
  (selectors, unit) => {
    return Object.keys(selectors).reduce((aggr, curr) => {
      aggr[curr] = {
        selected: selectors[curr]
      }

      return aggr
    }, {})
  }
)


