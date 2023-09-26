import axios from 'axios'
import { el } from 'element-plus/es/locale'

export const openai = (config: {
  link?: string
  key: string
  model?: string
  prompt: string
  content: string
  timeout?: number
}) => {
  const apiLink = config.link || 'https://api.openai.com/v1/engines'
  const delay = config.timeout || 15000
  const data = {
    model: config.model || 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: config.prompt
      },
      {
        role: 'user',
        content: config.content
      }
    ]
  }

  return axios.request({
    headers: {
      Authorization: 'Bearer ' + config.key,
      'Content-Type': 'application/json'
    },
    url: apiLink,
    data: data,
    method: 'post',
    timeout: delay
  })
}
