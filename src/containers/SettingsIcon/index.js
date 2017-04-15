import React from 'react'
import { connect } from 'react-redux'
import Cog from 'react-icons/lib/fa/cog'
import X from 'react-icons/lib/md/close'
import styled from 'styled-components'

import { toggleSideBar } from './../../store/weather/actions'

const IconWrap = styled.div`
  cursor: pointer;
  top: 29px;
  position: fixed;
  right: 30px;
  z-index: 10;
  transform: translateX(${({ sidebar }) => sidebar ? '-280px' : '0'});
  transition: transform 200ms ease-in-out;

  @media only screen and (max-width: 420px) {
    right: 15px;
  }
`

const SettingsIcon = ({ sidebar, toggleSideBar }) => (
  <IconWrap sidebar={sidebar} onClick={() => toggleSideBar()}>
    {!sidebar && <Cog size={25} color='white' />}
    {sidebar && <X size={30} color='white' />}
  </IconWrap>
)

export default connect(
  state => ({
    sidebar: state.weather.sidebar
  }),
  { toggleSideBar }
)(SettingsIcon)
