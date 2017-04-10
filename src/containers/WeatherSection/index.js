import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { mix } from 'polished'

import { SearchBar, WeatherData, Notification, Graph } from './../index'
import { Spinner } from './../../components/index'

const MainWrapper = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 9;
  display: inline-block;
  background: linear-gradient(
    180deg,
    ${props => props.color ? `${mix(0.30, props.color, props.bgc)}` : props.bgc} 5%,
    ${props => props.color ? `${mix(0.15, props.color, props.bgc)}` : props.bgc} 20%,
    ${props => props.bgc}
  );
`
// Hack to get gradient transition working
const MainWrapperHelper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.opacity};
  transition: opacity ${props => props.duration}ms linear;
  background: linear-gradient(
    180deg,
    ${props => props.color ? `${mix(0.30, props.color, props.bgc)}` : props.bgc} 10%,
    ${props => props.color ? `${mix(0.15, props.color, props.bgc)}` : props.bgc} 20%,
    ${props => props.bgc}
  );
`

const initialState = {
  nextColor: null,
  currColor: null,
  opacity: 0
}

@connect(
  state => ({
    color: state.weather.currColor,
    loading: state.weather.loading
  })
)
class WeatherSection extends Component {
  state = initialState

  componentWillReceiveProps (nextProps) {
    if (this.props.color !== nextProps.color) {
      this.setState({
        nextColor: nextProps.color,
        currColor: this.props.color,
        opacity: 1
      })
      setTimeout(() => this.setState({
        opacity: 0,
        currColor: this.state.nextColor
      }), this.props.transitionDuration)
    }
  }

  render () {
    const {
      nextColor,
      currColor,
      opacity
    } = this.state

    const {
      transitionDuration = 1000,
      bgc,
      loading
    } = this.props

    return (
      <MainWrapper
        bgc={bgc}
        color={currColor}>
        <MainWrapperHelper
          bgc={bgc}
          color={nextColor}
          opacity={opacity}
          duration={transitionDuration} />
        <SearchBar
          bgc={bgc}
          transitionDuration={transitionDuration} />
        { loading && <Spinner /> }
        <Notification>Something went wrong</Notification>
        <WeatherData transitionDuration={500} />
        <Graph />
      </MainWrapper>
    )
  }
}

export default WeatherSection
