import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`

const CheckboxLabel = styled.label`
  margin-left: 10px;
  font-size: 1.4rem;
  cursor: pointer;
`

const CheckboxInput = styled.input`
  cursor: pointer;
  appearance: none;
  top: 2px;
  left: 2px;
  background: white;
  border-radius: 1px;
  position: absolute;
  border-width: 0;
  transition: all 100ms linear;
  width: 14px;
  height: 14px;
  border-radius: 50%;

  &:checked {
    background-color: #2c2c2c;
  }

  &:focus {
    outline: 0 none;
    box-shadow: none;
  }
`

const CheckboxWrap = styled.div`
  display: inline-block;
  position: relative;
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 50%;
`

const Checkbox = ({ children }) => (
  <CheckboxContainer>
    <CheckboxWrap><CheckboxInput id='temperature' type='checkbox' /></CheckboxWrap>
    <CheckboxLabel htmlFor='temperature'>{children}</CheckboxLabel>
  </CheckboxContainer>
)

export default Checkbox
