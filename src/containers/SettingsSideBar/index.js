import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getSettingsSelectors } from './../../store/weather/selectors'
import { toggleSelector } from './../../store/weather/actions'

import { Checkbox } from './../../components/index'

const SideBarContainer = styled.div`
  width: 300px;

  background-color: #2c2c2c;
  color: white;
  position: fixed;
  z-index: 10;
  right: 0;
  top: 0;
  bottom: 0;
`

const X = styled.div`
  font-size: 3rem;
  padding: 10px 0 0 10px;
  cursor: pointer;
`

const SettingsHeader = styled.h3`
  margin: -15px 0 50px 0;
  font-size: 2rem;
  text-align: center;
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 50px;
`

const Button = styled.button`
  padding: 5px 15px;
  flex: 1;
  border-top: 1px solid white;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
  border-left: ${({ left }) => left ? 'none' : '1px solid white;'};
  color: ${({ color }) => color || 'white'};
  background-color: ${({ focused }) => focused ? '#2c2c2c' : 'white'};
  font-size: 1.2rem;
  cursor: ${({ focused }) => focused ? 'auto' : 'pointer'};
  display: inline-block;
  transition: background-color 500ms ease-in-out;

  &:focus {
    outline: none;  
  }
`


const SettingsSideBar = ({
  selectors,
  toggleSelector
}) => (
  <SideBarContainer>
    <X>&#10005;</X>
    <SettingsHeader>Settings</SettingsHeader>
    <ButtonsWrapper>
      <Button focused bgc={'#2c2c2c'}>˚F, mph</Button>
      <Button left bgc='white' color='#2c2c2c'>˚C, km/h</Button>
    </ButtonsWrapper>
    {
      selectors.map(({ selector, readable, selected }) => (
        <Checkbox
          key={selector}
          selector={selector}
          checked={selected}
          _handleChange={() => toggleSelector(selector)}>
          {readable}
        </Checkbox>
      ))
    }
  </SideBarContainer>
)

export default connect(
  state => ({
    selectors: getSettingsSelectors(state)
  }),
  { toggleSelector }
)(SettingsSideBar)
