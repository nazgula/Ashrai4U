export enum EUserApiPath {
  // Authentication
  login = 'login',
  verifyCode = 'verifyCode',
  // update loan request
  update = 'update',  
  // old
  signUp = 'signup',
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

export type TUpdateLoanRequestPayload = {
  agentId?: string;
  firstName?: string;
  lastName?: string;
  reason?: ELoanReason;
  carYear?: string;
  carValue?: string;
  carBrand?: string;
  requestedLoan?: string;
  monthlyReturn?: string;
  employmentType?: EEmplymentType;
  maritalStatus?: EMaritalStatus;
  partnerEmploymentType?: EEmplymentType;
  salary?: string;
  alimony?: string;
  pension?: string;
  allowance?: string;
  rent?: string;
}

interface ILoginApiCallResponse {
  AccessToken: string
  ExpiresIn: number
  TokenType: EUserApiTokenType
  RefreshToken: string
  IdToken: string
  ExpireTime?:number
}

export type TVerifyLoginApiCallResponse = ILoginApiCallResponse & {
  username: string
}

export enum ELoanReason {
  CAR = 'CAR',
  LODGING = 'LANDING',
  LOANS = 'LOAN_REDUCTION',
  OTHER = 'OTHER'
}

export enum EEmplymentType {
  CONTRACT = 'CONTRACT',
  FREELANCER = 'FREELANCER'
}

export enum EMaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED'
}



export * from './editProfile'
