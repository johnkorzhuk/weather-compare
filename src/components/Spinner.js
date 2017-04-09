import React from 'react'
import styled, { keyframes } from 'styled-components'

const bouncedelay = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1.0);
  }
`

const SpinnerContainer = styled.div`
  width: 30px;
  text-align: center;
  left: 9px;
  top: 7px;
  position: absolute;
`

const SpinnerItem1 = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color || '#313131'};

  border-radius: 100%;
  display: inline-block;
  animation: ${bouncedelay} 1.4s infinite ease-in-out both;

  animation-delay: -0.32s;
`
const SpinnerItem2 = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color || '#313131'};

  border-radius: 100%;
  display: inline-block;
  animation: ${bouncedelay} 1.4s infinite ease-in-out both;

  animation-delay: -0.16s;
`
const SpinnerItem3 = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color || '#313131'};

  border-radius: 100%;
  display: inline-block;
  animation: ${bouncedelay} 1.4s infinite ease-in-out both;
`

const Spinner = ({ color }) => (
  <SpinnerContainer>
    <SpinnerItem1 color={color} />
    <SpinnerItem2 color={color} />
    <SpinnerItem3 color={color} />
  </SpinnerContainer>
)

export default Spinner
