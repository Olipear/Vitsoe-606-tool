import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE,
})

api.defaults.timeout = 20000
api.defaults.headers.common['Accept'] = 'application/json'
api.defaults.headers.post['Content-type'] = 'application/json'

export { api }
