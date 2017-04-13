import React from 'react'
import styled from 'styled-components'

import { formatSelectors } from './../helpers/units'

const ToolTipContainer = styled.div`
  width: 200px;
  padding: 10px 15px;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 1.6rem;
  color: #313131;
`

const ToolTipLabel = styled.h3`
  margin: 0 0 15px 0;
  text-align: center;
  font-weight: 700;
`

const ToolTipDataContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 1.4rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const ToolTipDataName = styled.div`
  width: 100px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ToolTipDataValue = styled.div`
  width: 65px;
  float: right;
  display: inline-block;
  overflow: hidden;
  font-weight: 700;
  text-align: center;
`

const CustomTooltip = ({
  label,
  payload,
  unit,
  selector
}) => (
  <ToolTipContainer>
    <ToolTipLabel>{label}</ToolTipLabel>
    {
      payload
        .sort((a, b) => b.value - a.value)
        .map(({ name, value }) =>
          value &&
          <ToolTipDataContainer key={name}>
            <ToolTipDataName>{name}</ToolTipDataName>
            <ToolTipDataValue>{formatSelectors(value, selector, unit, true)}</ToolTipDataValue>
          </ToolTipDataContainer>
        )
    }
  </ToolTipContainer>
)

export default CustomTooltip
