import axios from 'axios'
import Config from 'react-native-config'

import Storage from '../utils/storage'

export const instance = axios.create({
  baseURL: Config.API,
  timeout: 60 * 1000
})

instance.interceptors.request.use(async (options) => {
  const accessToken = await Storage.getItem('accessToken')

  const newOptions = {
    ...options,
    headers: { ...options?.headers, 'X-Country-Id': 'TR', 'X-Language-Id': 'TR' }
  }

  if (accessToken) {
    newOptions.headers.Authorization = accessToken
  }

  return newOptions
})
