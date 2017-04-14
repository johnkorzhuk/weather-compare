import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { mix, transparentize } from 'polished'
import LocationIcon from 'react-icons/lib/fa/location-arrow'

import { fetchWeather, getUserLoc } from './../../store/weather/actions'
import { getLegendKeys } from './../../store/weather/selectors'

import { Container } from './../../components/index'

const Wrapper = styled.div`
  display: flex;
  width: 70%;
  margin: 25px auto;
  align-items: center;
  
  @media only screen and (max-width: 570px) {
    width: 80%;
    margin-left: 20px;
  }

  @media only screen and (max-width: 320px) {
    margin-left: 10px;
  }
`

const FormWrapper = styled.form`
  display: flex;
  flex-grow: 10;
  justify-content: center;
  font-size: 1.6rem;
  line-height: 3.2rem;
`

const Button = styled.button`
  flex-grow: 1;
  border-top: 1px solid white;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
  border-left: none;
  color: white;
  background-color: transparent;
  font-size: ${({ fontSize }) => fontSize || '0.75em'};
  cursor: pointer;

  &:focus {
    outline: none;  
  }

  @media only screen and (max-width: 570px) {
    flex-grow: 3;
  }
`

const Input = styled.input`
  flex-grow: 20;
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

  @media only screen and (max-width: 570px) {
    flex-grow: 8;
  }
`

const IconWrap = styled.div`
  width: 15px;
  padding: 5px 20px 5px 5px;
  flex-grow: 1;
  cursor: pointer;
  text-align: right;
`

const initState = {
  input: ''
}

@connect(
  state => ({
    color: state.weather.currColor,
    dataKeys: getLegendKeys(state)
  }),
  { fetchWeather, getUserLoc }
)
class SearchBar extends Component {
  state = initState;

  _handleCange = e => {
    this.setState({ input: e.target.value })
  };

  _handleFormSubmit = e => {
    e.preventDefault()

    this.props.fetchWeather(this.state.input)

    this.setState(initState)
  };

  render () {
    const {
      transitionDuration,
      color,
      bgc,
      dataKeys,
      getUserLoc
    } = this.props

    if (dataKeys.length <= 0 && this.input) this.input.focus()

    return (
      <Container>
        <Wrapper>
          <IconWrap onClick={getUserLoc}>
            <LocationIcon size={20} color='white' />
          </IconWrap>
          <FormWrapper onSubmit={this._handleFormSubmit}>
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
              innerRef={el => {
                this.input = el
              }}
            />
            <Button type='submit' color={color}>
              find
            </Button>
          </FormWrapper>
        </Wrapper>
      </Container>
    )
  }
}

export default SearchBar
