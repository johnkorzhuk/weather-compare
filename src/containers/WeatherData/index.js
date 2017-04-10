import React, { Component } from 'react'
import { connect } from 'react-redux'
import Skycons from 'react-skycons'

import { upperCaseUnderscore } from './../../helpers/string'
import { ForecastWrapper, ForecastItem, IconWrapper, ItemWrapper, ItemSubHeader, ItemSubHeaderContent, WeatherDataSection, Heading, HeadingTitle, TempIconWrapper } from './styled'

const checkPropAvaliability = props => typeof props !== 'undefined'

const initState = {
  opacity: 0
}

@connect(
  state => ({
    data: state.weather.data[state.weather.currLoc],
    loading: state.weather.loading,
    error: state.weather.error
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
      transitionDuration = 1000
    } = this.props

    if (typeof data === 'undefined') {
      return null
    } else {
      const {
        currently: { icon, temperature, summary, humidity, dewPoint, visibility, pressure, precipProbability },
        loc
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
              <ItemWrapper>
                <ItemSubHeaderContent left>{checkPropAvaliability(temperature) ? `${temperature} °` : '--'}</ItemSubHeaderContent>
                <ItemSubHeader left>{checkPropAvaliability(summary) ? summary.toLowerCase() : null}</ItemSubHeader>
              </ItemWrapper>
            </TempIconWrapper>
            <HeadingTitle>{loc}</HeadingTitle>
          </Heading>

          <ForecastWrapper>
            <ForecastItem>
              <ItemWrapper>
                <ItemSubHeaderContent>{checkPropAvaliability(precipProbability) ? `${Math.round(precipProbability) * 100} %` : '--'}</ItemSubHeaderContent>
                <ItemSubHeader>chance of rain</ItemSubHeader>
              </ItemWrapper>
            </ForecastItem>
            <ForecastItem>
              <ItemWrapper>
                <ItemSubHeaderContent>{checkPropAvaliability(humidity) ? `${Math.round(humidity * 100)} %` : '--'}</ItemSubHeaderContent>
                <ItemSubHeader>humidity</ItemSubHeader>
              </ItemWrapper>
            </ForecastItem>
            <ForecastItem>
              <ItemWrapper>
                <ItemSubHeaderContent>{checkPropAvaliability(dewPoint) ? `${Math.round(dewPoint)} °` : '--'}</ItemSubHeaderContent>
                <ItemSubHeader>dew point</ItemSubHeader>
              </ItemWrapper>
            </ForecastItem>
            <ForecastItem>
              <ItemWrapper>
                <ItemSubHeaderContent>{checkPropAvaliability(visibility) ? `${visibility} mi` : '--'}</ItemSubHeaderContent>
                <ItemSubHeader>visibility</ItemSubHeader>
              </ItemWrapper>
            </ForecastItem>
            <ForecastItem>
              <ItemWrapper>
                <ItemSubHeaderContent>{checkPropAvaliability(pressure) ? `${Math.round(pressure)} mb` : '--'}</ItemSubHeaderContent>
                <ItemSubHeader>pressure</ItemSubHeader>
              </ItemWrapper>
            </ForecastItem>
          </ForecastWrapper>
        </WeatherDataSection>
      )
    }
  }
}

export default WeatherData
