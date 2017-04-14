import { createSelector } from 'reselect'

import { SELECTORS_FORMAT, formatSelectors } from './../../helpers/units'

const getData = state => state.weather.data
const getGraphSelector = state => state.weather.graphSelector
const getSelectors = state => state.persisted.selectors
const getCurrLoc = state => state.weather.currLoc
export const getSelectedUnit = state =>
  Object.keys(state.persisted.units).filter(
    unit => state.persisted.units[unit]
  )[0]

export const getGraphData = createSelector(
  [getData, getGraphSelector, getSelectedUnit],
  (data, graphSelector, unit) => {
    let graphData = {}

    Object.keys(data).forEach(locKey => {
      const loc = data[locKey]

      loc.hourly.data.forEach(hour => {
        const time = hour.time * 1000

        if (graphData[time]) {
          graphData[time] = {
            ...graphData[time],
            [locKey]: hour[graphSelector]
          }
        } else {
          graphData[time] = {
            [locKey]: hour[graphSelector],
            time
          }
        }
      })
    })

    return graphData
  }
)

export const getLegendKeys = createSelector([getData], data => {
  return Object.keys(data).reduce(
    (aggr, curr) => {
      aggr[curr] = data[curr].color
      return aggr
    },
    {}
  )
})

const getSelectorsCurrData = createSelector(
  [getSelectors, getData, getCurrLoc],
  (selectors, data, currLoc) => {
    if (data[currLoc]) {
      return Object.keys(selectors).reduce(
        (aggr, curr) => {
          aggr[curr] = {
            selected: selectors[curr],
            value: data[currLoc].currently[curr],
            readable: SELECTORS_FORMAT[curr].readable,
            icon: data[currLoc].currently.icon,
            summary: data[currLoc].currently.summary
          }
          return aggr
        },
        {}
      )
    }
  }
)

export const getFormattedSelectors = createSelector(
  [getSelectorsCurrData, getSelectedUnit],
  (selectors, unit) => {
    if (selectors) {
      let data = {}
      return Object.keys(selectors)
        .filter(selector => {
          if (selectors[selector].icon) data.icon = selectors[selector].icon
          if (selectors[selector].summary) {
            data.summary = selectors[selector].summary
          }
          return selectors[selector].selected
        })
        .reduce(
          (aggr, curr) => {
            const { readable } = selectors[curr]
            aggr[curr] = {
              value: formatSelectors(selectors[curr].value, curr, unit, true),
              readable
            }
            return aggr
          },
          data
        )
    }
  }
)

export const getSettingsSelectors = createSelector(
  [getSelectors],
  selectors => {
    return Object.keys(selectors)
      .map(item => {
        if (item !== 'temperature') {
          return {
            selector: item,
            readable: SELECTORS_FORMAT[item].readable,
            selected: selectors[item]
          }
        }
      })
      .filter(Boolean)
  }
)
