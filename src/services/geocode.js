import axios from 'axios'

const GOOGLE_GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json'
const GEOCODE_KEY = 'AIzaSyC5_0aZRIIEf-B7_4fgtJqIb2CBpBRnp6A'

class GeocodeService {
  async getLatLng (q) {
    try {
      const { data } = await axios.get(`${GOOGLE_GEOCODE_ENDPOINT}?address=${q}&key=${GEOCODE_KEY}`)
      return data.results[0]
    } catch (e) {
      console.error(e)
    }
  }
}

export default new GeocodeService()
