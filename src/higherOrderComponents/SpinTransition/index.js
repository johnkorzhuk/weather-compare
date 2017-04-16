import React, { Component } from 'react'
import styled from 'styled-components'

import {
  SIDEBAR_TRANSITION_DURATION,
  SIDEBAR_EASING_FN
} from './../../containers/SettingsSideBar/constants'

const IconWrapper = styled.div`
  position: absolute;
  transform: ${({ rotation }) => `rotate(${rotation})`} ${({ opacity }) => opacity === 0 ? 'scale(0.8)' : 'scale(1)'};
  opacity: ${({ opacity }) => opacity};

  transition: transform ${SIDEBAR_TRANSITION_DURATION}ms ${SIDEBAR_EASING_FN},
              opacity ${SIDEBAR_TRANSITION_DURATION}ms ${SIDEBAR_EASING_FN};
`

export default class SpinerTransition extends Component {
  state = {
    rotation: this.props.initRotat,
    opacity: this.props.initOpacity
  };

  componentWillReceiveProps (nextProps) {
    this.setState({
      rotation: this.props.rotateAmnt,
      opacity: nextProps.sidebar ? 1 : 0
    })
    if (this.props.sidebar) {
      setTimeout(
        () => {
          this.setState({ rotation: this.props.initRotat })
        },
        SIDEBAR_TRANSITION_DURATION
      )
    }
  }

  render () {
    return (
      <IconWrapper
        style={this.props.style}
        opacity={this.state.opacity}
        rotation={this.state.rotation}
      >
        {this.props.children}
      </IconWrapper>
    )
  }
}
