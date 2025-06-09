// src/lib/api.ts
import axios from 'axios'

// const API_BASE_URL = 'https://geospatialdescription.sgis.tw/api'
const API_BASE_URL = 'http://localhost:8000/api'

export const getLocationDescription = async (geojson: JSON, context: string) => {
  const payload = {
    geojson,
    context
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/get_locd`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log('API response:', response.data)
    return response.data
  } catch (error) {
    console.error('API error：', error)
    throw error
  }
}