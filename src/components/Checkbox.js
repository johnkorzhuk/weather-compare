import React from 'react'
import styled from 'styled-components'
import Checkmark from 'react-icons/lib/fa/check'

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`

const CheckboxLabel = styled.label`
  padding: 2px 10px;
  font-size: 1.4rem;
  cursor: pointer;
`

const CheckboxInput = styled.input`
  cursor: pointer;
  appearance: none;
  top: 2px;
  left: 2px;
  background-color: #2c2c2c;
  border-radius: 1px;
  position: absolute;
  border-width: 0;
  transition: all 100ms linear;
  width: 14px;
  height: 14px;
  border-radius: 50%;

  &:checked {
    background-color: white;
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

const Checkbox = ({
  children,
  checked,
  selector,
  _handleChange
}) => (
  <CheckboxContainer>
    <CheckboxWrap>
      <CheckboxInput
        id={selector}
        type='checkbox'
        checked={checked}
        onChange={_handleChange} />
      {<Checkmark
        onClick={_handleChange}
        color='#2c2c2c'
        size={17}
        style={{
          paddingTop: 1,
          paddingLeft: 1,
          transform: 'translateY(0)',
          cursor: 'pointer',
          opacity: checked ? 1 : 0,
          transition: 'opacity 100ms linear'
        }} />}
    </CheckboxWrap>
    <CheckboxLabel
      htmlFor={selector}>
      {children}
    </CheckboxLabel>
  </CheckboxContainer>
)

export default Checkbox
