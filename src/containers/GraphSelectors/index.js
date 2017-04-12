import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  height: 100px;
`

const GraphSelectors = () => (
  <Container></Container>
)

export default connect(
  state => ({ selector: state.weather.graphSelector })
)(GraphSelectors)
