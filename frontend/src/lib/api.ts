// src/lib/api.ts
import axios from 'axios'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useProgress, StepState } from "@/context/ProgressContext"
import { Toast } from "@/components/ui/UseToast"

const API_BASE_URL = 'https://geospatialdescription.sgis.tw/api'
// const API_BASE_URL = 'http://localhost:8000/api'

// Old API endpoint for non-streaming requests
export const getLocationDescription = async (geojson: JSON, context: string) => {
  const payload = {
    geojson,
    context
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/stream_locd`, payload, {
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

// New API endpoint for streaming location description using Server-Sent Events (SSE)
export const streamLocationDescription = async (
  geojson: JSON,
  context: string,
  onMessage: (data: any) => void,
  onError?: (error: any) => void
) => {
  const controller = new AbortController()

  const payload = {
    geojson,
    context
  }

  try {
    await fetchEventSource(`${API_BASE_URL}/stream_locd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      onopen: async (response: Response) => {
        console.log('SSE connection opened (fetch-event-source)', response)
      },
      onmessage(msg) {
        if (msg.event === 'error') {
          console.error('[SSE] error event received:', msg.data)
          return
        }
        try {
          const data = JSON.parse(msg.data)
          onMessage(data)
        } catch (err) {
          console.error('[SSE] JSON parse error:', err)
          Toast({
            title: "Data Format Error",
            description: "Failed to parse server response data.",
            type: "error",
            onClose: () => {}
          });
        }
      },
      onerror(err) {
        console.error('SSE Error:', err)
        Toast({
          title: "Streaming Connection Error",
          description: "Request failed, please try again later.",
          type: "error",
          onClose: () => {}
        });
        controller.abort()
        if (onError) onError(err)
      }
    })
  } catch (err) {
    console.error('SSE connection failed:', err)
    if (onError) onError(err)
  }

  return controller
}
