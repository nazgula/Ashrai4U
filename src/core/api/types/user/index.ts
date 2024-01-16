export enum EUserApiPath {
  // Authentication
  login = 'login',
  verifyCode = 'verifyCode',
  // signUp = 'signup',
  // refresh = 'refresh',
  // User Management
  // verify = 'verify',
  // forgotPassword = 'forgetPasword',
  // confirmForgotPassword = 'confirmForgotPassword',
  // delete = 'delete',
  // Profile
  // profile = 'profile',
  // updateProfile = 'updateProfile',
  // Lead
  // addLead = 'addLead',
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

// export type TLoginApiCallPayload = Pick<
//   ISignUpApiCallPayload & IVerifyApiCallPayload,
//   'username' | 'password'
// >
export type TAddLeadApiCallPayload = IAddLeadApiCallPayload






// ----------------- NEEDED -----------------
// Response queries
export type TLoginApiCallResponse = {
  session: string
  codeVerifier: string
  username:string
}



export type TVerifyLoginApiCallPayload = 
TLoginApiCallResponse & {
  code: string
}

interface ILoginApiCallResponse {
  AccessToken: string
  ExpiresIn: number
  TokenType: EUserApiTokenType
  RefreshToken: string
  IdToken: string
}

export type TVerifyLoginApiCallResponse = ILoginApiCallResponse & {
  username: string
}

export * from './editProfile'
