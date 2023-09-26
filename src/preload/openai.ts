import axios from 'axios'
import { HttpsProxyAgent } from 'https-proxy-agent'

export const openai = (config: {
  link?: string
  key: string
  model?: string
  prompt: string
  content: string
  timeout?: number
  proxy?: string
}) => {
  const http_proxy = config.proxy || process.env.http_proxy || process.env.https_proxy
  return axios.request({
    headers: {
      Authorization: 'Bearer ' + config.key,
      'Content-Type': 'application/json'
    },
    url: config.link || 'https://api.openai.com/v1/chat/completions',
    data: {
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
    },
    method: 'post',
    timeout: config.timeout || 15000,
    httpAgent: http_proxy ? new HttpsProxyAgent(http_proxy) : undefined,
    httpsAgent: http_proxy ? new HttpsProxyAgent(http_proxy) : undefined,
    proxy: http_proxy ? false : undefined
  })
}
