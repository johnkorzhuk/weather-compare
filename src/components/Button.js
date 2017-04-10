import styled from 'styled-components'

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
`

export default Button
