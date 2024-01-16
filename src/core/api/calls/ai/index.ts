/* eslint-disable no-useless-catch */
import { EEndpoint, apiRequest } from '@/core/api'
import {
  EAiApiPath,
  TLoginApiCallResponse, 
  TSendQuestionApiCallPayload,
} from '../../types'
// TLoginApiCallResponse - difrent api then now
const apiEndpoint = EEndpoint.ai

export const sendQuestionApiCall = async (
  payload: TSendQuestionApiCallPayload,
  user: TLoginApiCallResponse,
) => {
  try {
    const response = await apiRequest({
      apiEndpoint,
      path: EAiApiPath.sendQuestion,
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          // @ts-expect-error  old interface - not in use file deprected 
          Authorization: `${user.TokenType} ${user.AccessToken}`,
        },
        body: JSON.stringify({ ...payload }),
      },
    })
    return response
  } catch (error) {
    throw error
  }
}

export const getAnswerApiCall = async (
  tokenId: string,
  user: TLoginApiCallResponse,
) => {
  try {
    const response = await apiRequest({
      apiEndpoint,
      path: `${EAiApiPath.getAnswer}/${tokenId}`,
      options: {
        method: 'GET',
        headers: {
          // @ts-expect-error  old interface - not in use file deprected 
          Authorization: `${user.TokenType} ${user.AccessToken}`,
        },
      },
    })
    if (Object.prototype.hasOwnProperty.call(response, 'answer')) {
      return response
    } else {
      throw new Error(response.message)
    }
  } catch (error) {
    console.log('IN PROCESS')
  }
}

export const getHistoryApiCall = async (
  user: TLoginApiCallResponse,
) => {
  try {
    const response = await apiRequest({
      apiEndpoint,
      path: `${EAiApiPath.history}`,
      options: {
        method: 'GET',
        headers: {
          // @ts-expect-error  old interface - not in use file deprected 
          Authorization: `${user.TokenType} ${user.AccessToken}`,
        },
      },
    })
    return response
  } catch (error) {
    console.log('IN PROCESS')
  }
}
