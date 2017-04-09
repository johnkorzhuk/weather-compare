import express from 'express'
import { join } from 'path'
import config, { mwConfig } from './config'
// import dotenv from 'dotenv'
import { WeatherRoutes } from './modules/index'

const app = express()
const { PORT } = config

mwConfig(app)

app.use('/api/v1', WeatherRoutes)
app.use(express.static('dist'))
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'))
})

app.listen(PORT, err => {
  if (err) return console.error(err)
  console.log(`> Running on port: ${PORT}`)
})
