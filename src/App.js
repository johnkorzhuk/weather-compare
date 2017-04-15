import React from 'react'
import {
  WeatherSection,
  SettingsSideBar,
  SettingsIcon
} from './containers/index'
import styled from 'styled-components'

const AppContainer = styled.main`
  display: flex;
`

const App = () => (
  <AppContainer>
    <WeatherSection bgc='#313131' transitionDuration={400} />
    <SettingsIcon />
    <SettingsSideBar />
  </AppContainer>
)

export default App
