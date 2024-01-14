/* eslint-disable @typescript-eslint/no-explicit-any */
import { EUserApiPath } from './types/user'

export enum EEndpoint {
  user = 'user',
  ai = 'ai',
}
export interface IApiPayload {
  apiEndpoint: string
  options: RequestInit
  path?: EUserApiPath | string
  params?: URLSearchParams
}

export const apiEndpoints = [
  {
    key: EEndpoint.user,
    baseUrl: process.env.REACT_APP_USER_API_ENDPOINT,
    getUrl: function () {
      return `${this.baseUrl}/${this.key}`
    },
  },
  {
    key: EEndpoint.ai,
    baseUrl: process.env.REACT_APP_AI_API_ENDPOINT,
    getUrl: function () {
      return `${this.baseUrl}/${this.key}`
    },
  },
]

export const apiRequest = async ({
  apiEndpoint,
  path,
  options,
  params,
}: IApiPayload) => {
  if (!apiEndpoint) {
    throw new Error('API endpoint is not defined!')
  }

  const endpoint = apiEndpoints
    .find((item) => item.key === apiEndpoint)
    ?.getUrl()

  const url = `${endpoint}/${path ? path : ''}?${new URLSearchParams(
    params,
  ).toString()}`

  console.log(url)

  try {
    const response = await fetch(url, options)

    if (response && response.status === 200) {
      return await response.json()
    } else {
      return response
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
