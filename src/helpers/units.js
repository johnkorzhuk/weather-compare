export const FtoC = f => (f - 32) * (5 / 9)

export const MtoKM = m => m * 1.609344

export const UNITS_F_MPH = 'F,mph'
export const UNITS_C_KMPH = 'C,kmph'

export const SELECTORS_FORMAT = {
  temperature: {
    readable: 'temperature',
    units: 'TEMP',
    unitSymbol: '°'
  },
  humidity: {
    readable: 'humidity',
    units: 'PERCENT',
    unitSymbol: '%'
  },
  cloudCover: {
    readable: 'cloud coverage',
    units: 'PERCENT',
    unitSymbol: '%'
  },
  dewPoint: {
    readable: 'dew point',
    units: 'TEMP',
    unitSymbol: '°'
  },
  ozone: {
    readable: 'ozone',
    units: 'DU',
    unitSymbol: 'DU'
  },
  precipProbability: {
    readable: 'precipitation %',
    units: 'PERCENT',
    unitSymbol: '%'
  },
  pressure: {
    readable: 'pressure',
    units: 'MB',
    unitSymbol: 'mb'
  },
  visibility: {
    readable: 'visibility',
    units: 'DISTANCE',
    unitSymbol: {
      [UNITS_F_MPH]: 'm',
      [UNITS_C_KMPH]: 'km'
    }
  },
  windSpeed: {
    readable: 'wind speed',
    units: 'DISTANCE',
    unitSymbol: {
      [UNITS_F_MPH]: 'mph',
      [UNITS_C_KMPH]: 'km/h'
    }
  },
  windBearing: {
    readable: 'wind bearing',
    units: 'DEGREE',
    unitSymbol: '°'
  }
}

export const formatSelectors = (value, selectorName, unit, appendSymbol) => {
  switch (SELECTORS_FORMAT[selectorName].units) {
    case 'PERCENT':
      return appendSymbol
        ? `${Math.round(value * 100)} ${SELECTORS_FORMAT[selectorName].unitSymbol}`
        : ({
          value: parseFloat(Math.round(value * 100)),
          symbol: SELECTORS_FORMAT[selectorName].unitSymbol
        })

    case 'TEMP':
      const temp = unit === UNITS_F_MPH ? value : FtoC(value)
      return appendSymbol
        ? `${temp.toFixed(1)} ${SELECTORS_FORMAT[selectorName].unitSymbol}`
        : ({
          value: parseFloat(temp.toFixed(1)),
          symbol: SELECTORS_FORMAT[selectorName].unitSymbol
        })

    case 'MB':
    case 'DU':
      return appendSymbol
        ? `${value.toFixed(1)} ${SELECTORS_FORMAT[selectorName].unitSymbol}`
        : ({
          value: parseFloat(value.toFixed(1)),
          symbol: SELECTORS_FORMAT[selectorName].unitSymbol
        })

    case 'DISTANCE':
      const distance = unit === UNITS_F_MPH ? value : MtoKM(value)
      return appendSymbol
        ? `${distance.toFixed(2)} ${SELECTORS_FORMAT[selectorName].unitSymbol[unit]}`
        : ({
          value: parseFloat(distance.toFixed(2)),
          symbol: SELECTORS_FORMAT[selectorName].unitSymbol[unit]
        })

    case 'DEGREE':
      return appendSymbol
        ? `${value} ${SELECTORS_FORMAT[selectorName].unitSymbol}`
        : ({
          value: parseFloat(value),
          symbol: SELECTORS_FORMAT[selectorName].unitSymbol
        })

    default:
      console.error('Wrong type of unit passed to formatSelectors')
      break
  }
}
