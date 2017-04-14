import React, { Component } from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import styled from 'styled-components'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { connect } from 'react-redux'

import './index.css'

import {
  getGraphData,
  getLegendKeys,
  getSelectedUnit
} from './../../store/weather/selectors'
import { getHour, getFullReadableTime } from './../../helpers/time'
import { CustomTooltip } from './../../components/index'
import { CustomLegend } from './../index'

import {
  formatSelectors,
  SELECTORS_FORMAT,
  UNITS_F_MPH
} from './../../helpers/units'

const getSymbol = (selector, unit) => {
  switch (SELECTORS_FORMAT[selector].units) {
    case 'DISTANCE':
      return SELECTORS_FORMAT[selector].unitSymbol[unit]

    case 'TEMP':
      return unit === UNITS_F_MPH
        ? `${SELECTORS_FORMAT[selector].unitSymbol}F`
        : `${SELECTORS_FORMAT[selector].unitSymbol}C`

    default:
      return SELECTORS_FORMAT[selector].unitSymbol
  }
}

const Container = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
`

const Header = styled.h2`
  color: white;
  position: absolute;
  bottom: 485px;
  font-size: 1.8rem;
`

@connect(state => ({
  error: state.weather.error,
  weatherData: getGraphData(state),
  dataKeys: getLegendKeys(state),
  selector: state.weather.graphSelector,
  unit: getSelectedUnit(state)
}))
class Graph extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    if (
      Object.keys(this.props.dataKeys).length !==
      Object.keys(nextProps.dataKeys).length
    ) {
      return true
    } else if (this.props.weatherData.length === 0) return true
    else if (this.props.weatherData !== nextProps.weatherData) return true
    else return false
  }

  _renderTooltip = ({ label, payload }) => {
    const labelContent = getFullReadableTime(label)

    return (
      <CustomTooltip
        unit={this.props.unit}
        selector={this.props.selector}
        label={labelContent}
        payload={payload}
      />
    )
  };

  _formatX = val => getHour(val);

  _formatY = (...args) => formatSelectors(...args).value;

  render () {
    const {
      dataKeys,
      error,
      selector,
      unit
    } = this.props

    if (Object.keys(dataKeys).length > 0 && !error) {
      const weatherData = Object.values(this.props.weatherData)
      return (
        <Container>
          <Header>{SELECTORS_FORMAT[selector].readable}</Header>
          <ResponsiveContainer width='100%' height={600}>
            <LineChart
              data={weatherData}
              margin={{ top: 60, right: 25, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey='time'
                scale='time'
                domain={['dataMin', 'dataMax']}
                type='number'
                tickFormatter={this._formatX}
              />
              <YAxis
                label={getSymbol(selector, unit)}
                padding={{ bottom: 20 }}
                domain={['dataMin', 'dataMax']}
                tickFormatter={val => this._formatY(val, selector, unit)}
              />
              <CartesianGrid strokeDasharray='3 3' />
              <Tooltip content={this._renderTooltip} />
              <Legend content={<CustomLegend />} verticalAlign='top' />
              {Object.keys(dataKeys).map(key => (
                <Line
                  strokeWidth={3}
                  connectNulls
                  opacity={0.7}
                  key={key}
                  type='monotone'
                  dataKey={key}
                  stroke={dataKeys[key]}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Container>
      )
    }
    return null
  }
}

export default Graph
