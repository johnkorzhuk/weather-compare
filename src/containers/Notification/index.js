import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ErrIcon from 'react-icons/lib/md/error-outline'

import { FETCH_WEATHER_ERROR } from './../../store/weather/actions'

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
        return (
          <Container>
            <ErrIcon size={30} color='#FF4949' style={{ marginRight: 10 }} />
            {notification.message}
            {' '}
          </Container>
        )
      default:
        return null
    }
  }
  return null
}

export default connect(state => ({
  notification: state.weather.notification,
  currColor: state.weather.currColor
}))(Notification)
