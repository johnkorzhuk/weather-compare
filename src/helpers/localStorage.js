export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('persisted')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

export const saveState = state => {
  try {
    console.log(state)
    const serializedState = JSON.stringify(state)
    localStorage.setItem('persisted', serializedState)
  } catch (e) {}
}
