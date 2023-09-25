import axios from 'axios'

export const openai = (
  apiUrl: string,
  apiKey: string,
  model: string,
  prompt: string,
  content: string
) => {
  const client = axios.create({
    headers: {
      Authorization: 'Bearer ' + apiKey
    }
  })
  const params = {
    model: model,
    messages: [
      {
        role: 'system',
        content: prompt
      },
      {
        role: 'user',
        content: content
      }
    ]
  }
  return client.post(apiUrl, params)
}
