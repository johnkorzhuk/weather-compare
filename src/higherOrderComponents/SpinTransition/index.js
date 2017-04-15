import React, { Component } from 'react'
import styled from 'styled-components'
// transform: ${({ rotation }) => rotation ? `rotate(${rotation})` : 'rotate(0deg)'};
const IconWrapper = styled.div`
  position: absolute;
  transform: ${({ rotation }) => `rotate(${rotation})`} ${({ opacity }) => opacity === 0 ? 'scale(0.8)' : 'scale(1)'};
  opacity: ${({ opacity }) => opacity};

  transition: transform ${({ duration }) => `${duration}ms linear`},
              opacity ${({ duration }) => `${duration}ms linear`};
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
        this.props.animateDuration
      )
    }
  }

  render () {
    return (
      <IconWrapper
        style={this.props.style}
        opacity={this.state.opacity}
        duration={this.props.animateDuration}
        rotation={this.state.rotation}
      >
        {this.props.children}
      </IconWrapper>
    )
  }
}
