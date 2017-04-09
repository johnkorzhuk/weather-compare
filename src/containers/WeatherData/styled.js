import styled from 'styled-components'

export const ForecastSection = styled.section`
  max-width: 100rem;
  margin: 25px auto 0;
  padding: 0 20px;
  color: white;
  opacity: ${props => props.opacity};
  transition: opacity ${props => props.duration}ms linear;
`

export const Heading = styled.div`
  margin: 35px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 570px) {
    flex-direction: column;
  }
`

export const ForecastWrapper = styled.div`
  &:before,
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`

export const ForecastItem = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;

  @media only screen and (max-width: 570px) {
    width: 50%;
    margin-bottom: 25px;
    text-align: center;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

export const TempIconWrapper = styled.div`
  margin-right: 20px;
  margin-left: -35px;
  display: flex;
  align-items: center;
`

export const IconWrapper = styled.div`
  height: 70px;
  width: 140px;
  display: inline-block;
`

export const ItemWrapper = styled.div`
  min-width: 90px;
  display: inline-block;
`

export const ItemSubHeaderContent = styled.div`
  font-size: 3rem;
  text-align: ${props => props.left ? 'left' : 'center'};;
`

export const ItemSubHeader = styled.div`
  margin-top: 4px;
  text-align: ${props => props.left ? 'left' : 'center'};
  font-size: 1.6rem;
`

export const HeadingTitle = styled.h2`
  margin-left: 20px;
  font-size: 3rem;

  @media only screen and (max-width: 570px) {
    margin: 0 0 35px 0;
    text-align: center;
    order: -1;
    font-size: 2rem;
  }
`
