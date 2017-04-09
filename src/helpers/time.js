// const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const convert24hClockTo12h = hour => {
  if (hour === 0) {
    return 12
  }
  return hour > 12 ? hour - 12 : hour
}

const formatMinute = minute => {
  if (minute === 0) return '00'
  else if (minute < 10) return `0${minute}`
  return minute
}

const getTomorrow = day => day === 6 ? 0 : day + 1

export const getReadableTime = time => {
  const date = new Date(time)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const isPm = hour > 11
  return `${convert24hClockTo12h(hour)}:${formatMinute(minute)}${isPm ? 'pm' : 'am'}`
}

export const getHour = time => {
  const date = new Date(time)
  const hour = date.getHours()
  const isPm = hour > 11
  return `${convert24hClockTo12h(hour)}${isPm ? 'pm' : 'am'}`
}

export const getFullReadableTime = time => {
  try {
    const today = new Date().getDay()
    const day = new Date(parseInt(time)).getDay()
    const readableTime = getReadableTime(time)

    if (today === day) return readableTime
    else if (getTomorrow(today) === day) return `${readableTime} Tomorrow`
    else return `${readableTime} ${DAYS[day]}`
  } catch (error) {
    console.error(error)
  }
}

export const roundToNearest = (time, min) => {
  const coeff = 1000 * 60 * min
  return Math.floor(time / coeff) * coeff
}
