import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {
  FETCH_WEATHER,
  FETCH_WEATHER_ERROR
} from './../../store/weather/actions'

import { Spinner, ErrorIcon } from './../../components/index'

const Container = styled.div`
  padding: 7px 15px 7px 50px;
  font-size: 1.6rem;
  color: white;
  position: fixed;
  top: 10px;
  left: 10px;
`

const Notification = ({ notification, currColor }) => {
  if (notification) {
    switch (notification.type) {
      case FETCH_WEATHER:
        return <Container><Spinner color={currColor} />{notification.message}</Container>
      case FETCH_WEATHER_ERROR:
        return <Container><ErrorIcon />{notification.message} </Container>
      default:
        return null
    }
  }
  return null
}

export default connect(
  state => ({
    notification: state.weather.notification,
    currColor: state.weather.currColor
  })
)(Notification)
