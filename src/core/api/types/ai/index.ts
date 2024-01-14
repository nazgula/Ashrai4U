export enum EAiApiPath {
  getAnswer = 'getAnswer',
  sendQuestion = 'sendQuestion',
  history = 'history',
}

interface ISendQuestionApiCallPayload {
  question: string
  history?: string[] | string
}
export type TSendQuestionApiCallPayload = ISendQuestionApiCallPayload
