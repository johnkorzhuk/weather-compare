import { Router } from 'express'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
const { DARKSKY_KEY } = process.env
const darkskyURL = (lat, lng) => `https://api.darksky.net/forecast/${DARKSKY_KEY}/${lat},${lng}`

const routes = new Router()

routes.get('/weather', async (req, res) => {
  try {
    const {
      lat,
      lng
    } = req.query
    const { data } = await axios.get(darkskyURL(lat, lng))
    return res.status(200).json({ data })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: true, message: 'Server Error' })
  }
})

export default routes
