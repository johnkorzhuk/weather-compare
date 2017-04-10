import React from 'react'
import { WeatherSection, SettingsSideBar } from './containers/index'
import styled from 'styled-components'

const AppContainer = styled.main`
  display: flex;
  overflow: hidden;
`

const App = () =>
  <AppContainer>
    <WeatherSection
      bgc='#313131'
      transitionDuration={500} />
    <SettingsSideBar />
  </AppContainer>

export default App
