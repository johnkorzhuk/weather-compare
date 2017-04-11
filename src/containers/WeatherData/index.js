import React, { Component } from 'react'
import { connect } from 'react-redux'
import Skycons from 'react-skycons'

import { upperCaseUnderscore } from './../../helpers/string'
import { getFormattedSelectors } from './../../store/weather/selectors'

import { ForecastWrapper, IconWrapper, WeatherDataSection, Heading, HeadingTitle, TempIconWrapper } from './styled'
import { ForecastItem } from './../../components/index'

const checkPropAvaliability = props => typeof props !== 'undefined'

const initState = {
  opacity: 0
}

@connect(
  state => ({
    loading: state.weather.loading,
    error: state.weather.error,
    data: getFormattedSelectors(state),
    currLoc: state.weather.currLoc
  })
)
class WeatherData extends Component {
  state = initState

  componentWillReceiveProps (nextProps) {
    if (nextProps.error) {
      this.setState({
        opacity: 1
      })
    }
    if (nextProps.loading) {
      this.setState({
        opacity: 0
      })
    }
    if (this.props.data !== nextProps.data) {
      setTimeout(() => this.setState({
        opacity: 1
      }), this.props.transitionDuration)
    }
  }

  render () {
    const {
      data,
      transitionDuration = 1000,
      currLoc
    } = this.props

    if (!data) {
      return null
    } else {
      const {
        temperature,
        icon,
        summary
      } = data

      return (
        <WeatherDataSection
          duration={transitionDuration}
          opacity={this.state.opacity}
          loading={this.loaded}>
          <Heading>
            <TempIconWrapper>
              <IconWrapper>
                <Skycons
                  color='white'
                  icon={checkPropAvaliability(icon) ? upperCaseUnderscore(icon) : 'PARTLY_CLOUDY_DAY'}
                  autoplay />
              </IconWrapper>
              <ForecastItem
                left
                value={temperature.value}
                name={summary} />
            </TempIconWrapper>
            <HeadingTitle>{currLoc}</HeadingTitle>
          </Heading>

          <ForecastWrapper>
            {
              Object.keys(data).map(item => {
                if (item === 'summary' || item === 'icon' || item === 'temperature') return null
                return (
                  <ForecastItem
                    key={data[item].readable}
                    value={data[item].value}
                    name={data[item].readable} />
                )
              })
            }
          </ForecastWrapper>
        </WeatherDataSection>
      )
    }
  }
}

export default WeatherData
