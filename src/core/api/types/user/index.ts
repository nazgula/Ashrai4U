export enum EUserApiPath {
  // Authentication
  signUp = 'signup',
  login = 'login',
  refresh = 'refresh',
  // User Management
  verify = 'verify',
  forgotPassword = 'forgetPasword',
  confirmForgotPassword = 'confirmForgotPassword',
  delete = 'delete',
  // Profile
  profile = 'profile',
  updateProfile = 'updateProfile',
  // Lead
  addLead = 'addLead',
}

enum EUserApiTokenType {
  bearer = 'Bearer',
}

interface ISignUpApiCallPayload {
  username: string // email or phone
  password: string
}
interface IVerifyApiCallPayload {
  username: string // email or phone
  code: string
}
interface ILoginApiCallResponse {
  AccessToken: string
  ExpiresIn: number
  TokenType: EUserApiTokenType
  RefreshToken: string
  IdToken: string
  // UserName?: string
}

interface IAddLeadApiCallPayload {
  companyName: string
  contactFullName: string
  email: string
  phone: string
  proposition: string
}

// Payload queries
export type TSignUpApiCallPayload = ISignUpApiCallPayload
export type TDeleteApiCallPayload = TSignUpApiCallPayload
export type TVerifyApiCallPayload = IVerifyApiCallPayload
export type TLoginApiCallPayload = Pick<
  ISignUpApiCallPayload & IVerifyApiCallPayload,
  'username' | 'password'
>
export type TAddLeadApiCallPayload = IAddLeadApiCallPayload

// Response queries
export type TLoginApiCallResponse = ILoginApiCallResponse & {
  UserName: string
}

export * from './editProfile'
