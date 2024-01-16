import {
  EType,
  EWarLocation,
  EObligo,
  EBankAccount,
  EIncome,
  EVictom,
  ERecruted,
  EEvacuated,
  EDamageStatus,
  EDomain,
} from '@/core/api/types'

export interface IProfileInitialState {
  profile: IProfile
}
export interface IProfile {
  type?: EType
  warLocation?: EWarLocation
  obligo?: EObligo
  bankAccount?: EBankAccount
  loanStatus?: string
  income?: EIncome
  victom?: EVictom
  recruted?: ERecruted
  evacuated?: EEvacuated
  damageStatus?: EDamageStatus
  domain?: EDomain[]
  companyName: string
  fullName: string
  indetifier: string
  accountId: string
  // --------
  phone:string
  codeVerifier:string
  firstName:string
  lastName:string
  loanAmount:string
  loanPeriod:string
  loanReason:string
}
