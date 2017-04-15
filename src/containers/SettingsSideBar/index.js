import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  getSettingsSelectors,
  getSelectedUnit
} from './../../store/weather/selectors'
import { toggleSelector, toggleUnits } from './../../store/persisted/actions'
import { Checkbox } from './../../components/index'

import { UNITS_F_MPH, UNITS_C_KMPH } from './../../helpers/units'
import {
  SIDEBAR_TRANSITION_DURATION,
  SIDEBAR_WIDTH,
  SIDEBAR_EASING_FN
} from './constants'

const SideBarContainer = styled.div`
  width: ${SIDEBAR_WIDTH}px;
  transform: translateX(${({ sidebar }) => sidebar ? 0 : '100%'})
  background-color: #2c2c2c;
  color: white;
  position: fixed;
  z-index: 10;
  right: 0;
  top: 0;
  bottom: 0;
  transition: transform ${SIDEBAR_TRANSITION_DURATION}ms ${SIDEBAR_EASING_FN};
`

const SettingsHeader = styled.h2`
  margin: 20px 0 40px 0;
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
  color: ${({ focused }) => focused ? '#2c2c2c' : 'white'};
  background-color: ${({ focused }) => focused ? 'white' : '#2c2c2c'};
  font-size: 1.2rem;
  cursor: ${({ focused }) => focused ? 'auto' : 'pointer'};
  display: inline-block;
  transition: background-color 100ms linear,
              color 100ms linear;

  &:focus {
    outline: none;  
  }
`

const WeatherDataControlsHeader = styled.h3`
  margin-bottom: 20px;
  font-size: 1.8rem;
`

const WeatherDataControlsWrapper = styled.div`
  margin: 35px 0 0 25px;
`

const SettingsSideBar = (
  {
    selectors,
    unit,
    sidebar,
    toggleSideBar,
    toggleSelector,
    toggleUnits
  }
) => (
  <SideBarContainer sidebar={sidebar}>
    <SettingsHeader>Settings</SettingsHeader>
    <ButtonsWrapper>
      <Button
        onClick={() => toggleUnits(UNITS_F_MPH)}
        focused={unit === UNITS_F_MPH}
      >
        ˚F, mph
      </Button>
      <Button
        onClick={() => toggleUnits(UNITS_C_KMPH)}
        focused={unit === UNITS_C_KMPH}
        left
      >
        ˚C, km/h
      </Button>
    </ButtonsWrapper>
    <WeatherDataControlsWrapper>
      <WeatherDataControlsHeader>
        weather data controls
      </WeatherDataControlsHeader>
      {selectors.map(({ selector, readable, selected }) => (
        <Checkbox
          key={selector}
          selector={selector}
          checked={selected}
          _handleChange={() => toggleSelector(selector)}
        >
          {readable}
        </Checkbox>
      ))}
    </WeatherDataControlsWrapper>
  </SideBarContainer>
)

export default connect(
  state => ({
    selectors: getSettingsSelectors(state),
    unit: getSelectedUnit(state),
    sidebar: state.weather.sidebar
  }),
  { toggleSelector, toggleUnits }
)(SettingsSideBar)
