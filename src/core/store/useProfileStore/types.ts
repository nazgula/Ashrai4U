import {EType, ELoanReason, EEmplymentType, EMaritalStatus} from '@/core/api/types'

export interface IProfileInitialState {
  profile: IProfile
}
export interface IProfile {
   type?: EType
  // warLocation?: EWarLocation
  // obligo?: EObligo
  // bankAccount?: EBankAccount
  // loanStatus?: string
  // income?: EIncome
  // victom?: EVictom
  // recruted?: ERecruted
  // evacuated?: EEvacuated
  // damageStatus?: EDamageStatus
  // domain?: EDomain[]
  // companyName: string
  // fullName: string
  // indetifier: string
  // accountId: string
  // --------
  phone:string
  codeVerifier:string
  // firstName:string
  // lastName:string
  // loanAmount:string
  // loanPeriod:string
  // loanReason:string

    agentId: string,
    username: string,
    firstName: string,
    lastName: string,
    resone: ELoanReason,
    carYear: string,
    carValue: string,
    carBrand: string,
    requestedLoan: string,
    monthlyReturn: string,
    employmentType: EEmplymentType,
    maritalStatus: EMaritalStatus,
    partnerEmploymentType: EEmplymentType,
    salary: string,
    alimony: string,
    pension: string,
    allowance: string,
    rent: string
}


