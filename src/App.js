import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WeatherSection, SettingsSideBar, SettingsIcon } from './containers/index'
import styled from 'styled-components'

const AppContainer = styled.main`
  display: flex;
  overflow-x: ${({ sidebar }) => sidebar ? 'visible' : 'hidden'}; 
`

// hack to get scrollbar behaving
const initState = {
  sidebar: false
}

@connect(
  state => ({ sidebar: state.weather.sidebar })
)
class App extends Component {
  state = initState

  componentWillReceiveProps (nextProps) {
    if (!nextProps.sidebar) {
      this.setState(initState)
    } else {
      setTimeout(() => {
        this.setState({ sidebar: true })
      }, 100)
    }
  }

  render () {
    const { sidebar } = this.state

    return (
      <AppContainer sidebar={sidebar}>
        <WeatherSection
          bgc='#313131'
          transitionDuration={400} />
        <SettingsIcon />
        <SettingsSideBar />
      </AppContainer>
    )
  }
}

export default App
