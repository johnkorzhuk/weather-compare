import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {
  FETCH_WEATHER_ERROR
} from './../../store/weather/actions'

import { ErrorIcon } from './../../components/index'

const Container = styled.div`
  padding: 7px 15px 7px 25px;
  font-size: 1.6rem;
  color: white;
  position: fixed;
  top: 66px;
  left: 20px;
`

const Notification = ({ notification, currColor }) => {
  if (notification) {
    switch (notification.type) {
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
