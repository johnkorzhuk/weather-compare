import styled from 'styled-components'

export const WeatherDataSection = styled.section`
  margin: 50px auto 0;
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
  max-width: 1200px
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  &:before,
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`

export const TempIconWrapper = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
`

export const IconWrapper = styled.div`
  height: 70px;
  width: 140px;
  margin-right: 20px;
  display: inline-block;

  @media only screen and (max-width: 570px) {
    flex-basis: 200px;
  }
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
