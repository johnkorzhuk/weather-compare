import axios from 'axios'

const WEATHER_DATA_ENDPOINT = '/api/v1/weather'

class WeatherService {
  async getWeatherData (lat, lng) {
    try {
      const { data } = await axios.get(`${WEATHER_DATA_ENDPOINT}?lat=${lat}&lng=${lng}`)
      return data
    } catch (e) {
      console.error(e)
    }
  }
}

export default new WeatherService()
