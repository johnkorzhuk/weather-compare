import React, { Component } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { connect } from 'react-redux'

import { getGraphData, getLegendKeys } from './../../store/weather/selectors'
import { getHour, getFullReadableTime } from './../../helpers/time'
import { CustomTooltip } from './../../components/index'
import { CustomLegend } from './../index'


const formatX = val => getHour(val)

const formatY = val => `${Math.round(val)}°`

@connect(
  state => ({
    error: state.weather.error,
    weatherData: getGraphData(state),
    dataKeys: getLegendKeys(state)
  })
)
class Graph extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    if (Object.keys(this.props.dataKeys).length !== Object.keys(nextProps.dataKeys).length) return true
    else if (this.props.weatherData.length === 0) return true
    else return false
  }

  _renderTooltip = ({ label, payload }) => {
    const labelContent = getFullReadableTime(label)

    return (
      <CustomTooltip label={labelContent} payload={payload} />
    )
  }

  render () {
    const {
      dataKeys,
      error
    } = this.props

    if (Object.keys(dataKeys).length > 0 && !error) {
      const weatherData = Object.values(this.props.weatherData)
      return (
        <ResponsiveContainer width='100%' height={600}>
          <LineChart
            data={weatherData}
            margin={{top: 50, right: 50, left: 0, bottom: 5}}>
            <XAxis
              dataKey='time'
              scale='time'
              domain={[ 'dataMin', 'dataMax' ]}
              type='number'
              tickFormatter={formatX} />
            <YAxis
              padding={{ bottom: 20 }}
              domain={[ 'dataMin', 'dataMax' ]}
              tickFormatter={formatY} />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip
              content={this._renderTooltip} />
            <Legend
              content={<CustomLegend />}
              align='left'
              verticalAlign='top'
              wrapperStyle={{ color: 'white' }} />
            {
              Object.keys(dataKeys).map(key =>
                <Line
                  strokeWidth={3}
                  connectNulls
                  opacity={0.7}
                  key={key}
                  type='monotone'
                  dataKey={key}
                  stroke={dataKeys[key]} />
              )
            }
          </LineChart>
        </ResponsiveContainer>
      )
    }
    return null
  }
}

export default Graph
