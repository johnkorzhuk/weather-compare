import { createSelector } from 'reselect'

const getData = state => state.weather.data
const getSelector = state => state.weather.selector

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
