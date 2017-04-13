import React from 'react'
import styled from 'styled-components'

const ForecastItemContainer = styled.div`
  width: 33.3%;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  cursor: pointer;
  margin-top: ${props => props.left ? 0 : '35px'};

  @media only screen and (max-width: 730px) {
    text-align: center;
  }
  @media only screen and (max-width: 570px) {
    width: 50%;
  }
`

const ItemWrapper = styled.div`
  min-width: 100px;
  display: inline-block;
`

const ItemSubHeaderContent = styled.div`
  font-size: 3rem;
  text-align: ${props => props.left ? 'left' : 'center'};;
`

const ItemSubHeader = styled.div`
  margin-top: 4px;
  text-align: ${props => props.left ? 'left' : 'center'};
  font-size: 1.6rem;
`

const ForecastItem = ({
  value,
  name,
  left,
  _handleClick
}) => (
  <ForecastItemContainer
    onClick={_handleClick}
    left={left}>
    <ItemWrapper>
      <ItemSubHeaderContent left={left}>{value}</ItemSubHeaderContent>
      <ItemSubHeader left={left}>{name}</ItemSubHeader>
    </ItemWrapper>
  </ForecastItemContainer>
)

export default ForecastItem
