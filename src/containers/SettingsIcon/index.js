import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import X from 'react-icons/lib/md/close'
import Cog from 'react-icons/lib/fa/cog'

import { toggleSideBar } from './../../store/weather/actions'

import { SpinerTransition } from './../../higherOrderComponents/index'

import {
  SIDEBAR_TRANSITION_DURATION,
  SIDEBAR_WIDTH,
  SIDEBAR_EASING_FN
} from './../SettingsSideBar/constants'

const IconWrap = styled.div`
  cursor: pointer;
  top: 29px;
  position: fixed;
  right: 50px;
  z-index: 10;
  transform: translateX(${({ sidebar }) => sidebar ? `-${SIDEBAR_WIDTH}px` : '0'});
  transition: transform ${SIDEBAR_TRANSITION_DURATION}ms ${SIDEBAR_EASING_FN};

  @media only screen and (max-width: 420px) {
    right: 35px;
  }
`

const SettingsIcon = ({ sidebar, toggleSideBar }) => (
  <IconWrap sidebar={sidebar} onClick={() => toggleSideBar()}>
    <SpinerTransition
      animateDuration={350}
      sidebar={!sidebar}
      initOpacity={1}
      initRotat={sidebar ? '0deg' : '90deg'}
      rotateAmnt={sidebar ? '90deg' : '0deg'}
    >
      <Cog size={25} color='white' />
    </SpinerTransition>
    <SpinerTransition
      style={{ right: -28, top: -2 }}
      sidebar={sidebar}
      initOpacity={0}
      initRotat={sidebar ? '0deg' : '270deg'}
      rotateAmnt={sidebar ? '270deg' : '0deg'}
    >
      <X size={30} color='white' />
    </SpinerTransition>

  </IconWrap>
)

export default connect(
  state => ({
    sidebar: state.weather.sidebar
  }),
  { toggleSideBar }
)(SettingsIcon)
