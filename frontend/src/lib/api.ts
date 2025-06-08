// src/lib/api.ts
import axios from 'axios'

// const API_BASE_URL = 'https://geospatialdescription.sgis.tw/api'
const API_BASE_URL = 'http://localhost:8000/api'

export const getLocationDescription = async (lat: number, lon: number, context: string) => {
  const params = {
    "lat": lat,
    "lon": lon,
    "context": context
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/map_location`, { params })
    return response.data
  } catch (error) {
    console.error('API error：', error)
    throw error
  }
}