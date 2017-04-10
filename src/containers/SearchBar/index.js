import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { mix, transparentize } from 'polished'

import { fetchWeather } from './../../store/weather/actions'
import { getLegendKeys } from './../../store/weather/selectors'

import { Container, Button } from './../../components/index'

const Wrapper = styled.form`
  width: 70%;
  margin: 0 auto;
  padding-top: 25px;
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
  line-height: 3.2rem;

  @media only screen and (max-width: 570px) {
    width: 90%;
    font-size: 1.8rem;
    line-height: 3.6rem;
  }
`

const Input = styled.input`
  flex-grow: 10;
  padding: 0 10px;
  display: block;
  border: 1px solid white;
  border-radius: 0;
  font-size: inherit;
  font-weight: 700;
  line-height: inherit;
  transition: color ${props => props.duration}ms linear;
  color: ${props => props.color ? `${mix(0.30, props.color, props.bgc)}` : props.bgc};

  &::placeholder {
    transition: color ${props => props.duration}ms linear;
    color: ${props => props.color ? `${transparentize(0.5, mix(0.30, props.color, props.bgc))}` : transparentize(0.5, props.bgc)};;
  }

  &:focus {
    outline: none;  
  }
`

const initState = {
  input: ''
}

@connect(
  state => ({
    color: state.weather.currColor,
    dataKeys: getLegendKeys(state)
  }),
  { fetchWeather }
)
class SearchBar extends Component {
  state = initState

  _handleCange = e => {
    this.setState({ input: e.target.value })
  }

  _handleFormSubmit = e => {
    e.preventDefault()

    this.props.fetchWeather(this.state.input)

    this.setState(initState)
  }

  render () {
    const {
      transitionDuration,
      color,
      bgc,
      dataKeys
    } = this.props

    if (dataKeys.length <= 0 && this.input) this.input.focus()

    return (
      <Container>
        <Wrapper onSubmit={this._handleFormSubmit}>
          <Input
            type='text'
            placeholder='city or zip'
            value={this.state.input}
            onChange={this._handleCange}
            duration={transitionDuration}
            color={color}
            bgc={bgc}
            autoFocus
            required
            innerRef={el => { this.input = el }} />
          <Button
            type='submit'
            color={color}>
            find</Button>
        </Wrapper>
      </Container>
    )
  }
}

export default SearchBar
