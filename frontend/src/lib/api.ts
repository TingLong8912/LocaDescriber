// src/lib/api.ts
import axios from 'axios'

const API_BASE_URL = 'https://geospatialdescription.sgis.tw/api'
// const API_BASE_URL = 'http://localhost:8000/api'

export const getLocationDescription = async (geojson: JSON, context: string) => {
  const params = {
    "geojson": geojson,
    "context": context
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/api/get_locd`, { params }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('API error：', error)
    throw error
  }
}