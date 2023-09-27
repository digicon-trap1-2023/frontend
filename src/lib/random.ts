export const randomColor = () => {
  const base = Math.floor(Math.random() * 16777215).toString(16)
  return '#' + base.padStart(6, '0')
}
