import { complement } from 'polished'

const COLORS = [
  '#cc241d',
  '#fb4934',
  '#98971a',
  '#b8bb26',
  '#d79921',
  '#fabd2f',
  '#458588',
  '#83a598',
  '#b16286',
  '#d3869b',
  '#d65d0e',
  '#fe8019',
  '#689d6a',
  '#8ec07c',
  '#ebdbb2',
  '#fbf1c7'
]

let lastIndex = 0

const getRandomColorIndex = lastIndex => {
  const getRandomIndex = () => Math.floor(Math.random() * COLORS.length)
  const randomIndex = getRandomIndex()
  if (randomIndex === lastIndex) {
    getRandomColorIndex(randomIndex)
  }
  return randomIndex
}

export default () => {
  const index = getRandomColorIndex(lastIndex)
  const color = index % 2 === 0 && lastIndex % 2 !== 0 ? complement(COLORS[index]) : COLORS[index]

  lastIndex = index

  return color
}
