import React from 'react'
import styled from 'styled-components'

const Icon = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #FF4949;
  left: 24px;
  top: 3px;
  position: absolute;
`

const ErrorIcon = () => (
  <Icon>!</Icon>
)

export default ErrorIcon
