import React, { Component } from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { lighten } from 'polished'

import { updateCurrLoc, deleteLoc } from './../../store/weather/actions'

const LegendContainer = styled.li`
  top: 0;
  margin-top: 0;
  margin-right: 15px;
  padding: 15px 10px;
  display: inline-block;
  position: relative;
  font-size: 1.6rem;
  color: white;
  opacity: ${props => props.unmounting ? 0 : 1}
  transition: opacity ${props => props.animateOutDuration}ms ease-in-out,
              top ${props => props.animateOutDuration}ms ease-in-out;
`

const LegendContent = styled.div`
  cursor: pointer;
`

const LegendDash = styled.span`
  position: absolute;
  top: 16px;
  left: -6px;
  color: ${props => props.color};
  opacity: ${props => props.hover ? 0 : 1};
  transition: opacity 200ms ease-in-out;

  @media only screen and (max-width: 700px) {
    opacity: 0;
  }
`

const X = styled.div`
  padding: 5px 0 5px 5px; 
  position: absolute;
  top: ${props => props.hover ? '14px' : '34px'};
  left: -11px;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${props => props.color};
  opacity: ${props => props.hover ? 1 : 0};
  transition: opacity 200ms ease-in-out,
              top 200ms ease-in-out;
  
  @media only screen and (max-width: 700px) {
    opacity: 1;
    top: 14px;
  }
`

const CustomLegend = ({
  updateCurrLoc,
  deleteLoc,
  payload,
  currLoc,
  dataKeys
}) => (
  <TransitionGroup component='ul'>
    {
      payload.map(({ color, value }) => (
        <CustomLegendItem
          animateOutDuration={100}
          dataKeys={dataKeys}
          currLoc={currLoc}
          deleteLoc={deleteLoc}
          updateCurrLoc={updateCurrLoc}
          key={`item-${value}`}
          color={color}
          value={value} />
      ))
    }
  </TransitionGroup>
)

class CustomLegendItem extends Component {
  state = {
    hovered: false,
    unmounting: false
  }

  componentWillLeave (callback) {
    setTimeout(callback, this.props.animateOutDuration)
  }

  _handleLocToggle = loc => {
    if (loc !== this.props.currLoc) {
      this.props.updateCurrLoc(loc)
    }
  }

  _handleLocDelete = loc => {
    this.setState({ unmounting: true })
    this.props.deleteLoc(loc)
  }

  render () {
    const {
      value,
      animateOutDuration
    } = this.props

    let color = lighten(0.7, this.props.color)
    if (color === '#fff') color = this.props.color

    const {
      unmounting,
      hovered
    } = this.state
    return (
      <LegendContainer
        key={`item-${value}`}
        animateOutDuration={animateOutDuration}
        unmounting={unmounting}
        id={value}
        onMouseEnter={e => this.setState({ hovered: true })}
        onMouseLeave={e => this.setState({ hovered: false })}>
        <LegendContent onClick={() => this._handleLocToggle(value)}>
          <LegendDash
            hover={hovered}
            color={color}>
            &#9679;
          </LegendDash>
          { value }
        </LegendContent>
        <X
          color={color}
          hover={hovered}
          onClick={() => this._handleLocDelete(value)}>&#10005;</X>
      </LegendContainer>
    )
  }
}

export default connect(
  state => ({
    currLoc: state.weather.currLoc,
    dataKeys: state.weather.legendKeys
  }),
  { updateCurrLoc, deleteLoc }
)(CustomLegend)
