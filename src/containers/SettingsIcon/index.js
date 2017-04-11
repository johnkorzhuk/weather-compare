import React from 'react'
import { connect } from 'react-redux'
import Cog from 'react-icons/lib/fa/cog'
import X from 'react-icons/lib/md/close'
import Overdrive from 'react-overdrive'
import styled from 'styled-components'

import { toggleSideBar } from './../../store/weather/actions'

const IconWrap = styled.div`
  cursor: pointer;
  margin-left: 20px;
  @media only screen and (min-width: 570px) {
    position: absolute;
    right: 20px;
  }
`

const SettingsIcon = ({ sidebar, toggleSideBar }) => (
  <IconWrap onClick={() => toggleSideBar()}>
    {!sidebar && <Overdrive id='cog'><Cog size={25} color='white' /></Overdrive>}
    {sidebar && <Overdrive id='x'><X size={30} color='white' /></Overdrive>}
  </IconWrap>
)

export default connect(
  state => ({ sidebar: state.weather.sidebar }),
  { toggleSideBar }
)(SettingsIcon)
