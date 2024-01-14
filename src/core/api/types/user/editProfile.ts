enum EType {
  COMPANY = 'COMPANY',
  AUTHORIZED_DEALER = 'AUTHORIZED_DEALER',
  ASSOCIATION = 'ASSOCIATION',
}
enum EWarLocation {
  NORTH = 'NORTH',
  'SOUTH-30' = 'SOUTH-30',
  'SOUTH-40' = 'SOUTH-40',
  NO = 'NO',
}
enum EObligo {
  '<2' = '<2',
  '>2' = '>2',
}
enum EBankAccount {
  LEUMI = 'LEUMI',
  POALIM = 'POALIM',
  DISCONT = 'DISCONT',
  IGUD = 'IGUD',
  BEN_LEUMI = 'BEN_LEUMI',
  MIZRCHI = 'MIZRCHI',
  JERUSALEM = 'JERUSALEM',
}

enum ELoanStatus {
  MORTGAGE = 'MORTGAGE',
  LOAN = 'LOAN',
  NONE = 'NONE',
  STATE_LOAN = 'STATE_LOAN',
}
enum EIncome {
  '<5' = '<5',
  '5-25' = '5-25',
  '25-100' = '25-100',
  '>500' = '>500',
}
enum EVictom {
  YES = 'YES',
  NO = 'NO',
}
enum ERecruted {
  YES = 'YES',
  NO = 'NO',
}
enum EEvacuated {
  YES = 'YES',
  NO = 'NO',
}
enum EDamageStatus {
  NONE = 'NONE',
  DIRECT = 'DIRECT',
  INDIRECT = 'INDIRECT',
}
enum EDomain {
  INDUSTRY = 'INDUSTRY',
  EXPORT_250 = 'EXPORT_250',
  EXPORT_ABOVE_250 = 'EXPORT_ABOVE_250',
  FOOD = 'FOOD',
  AGRICULTURE = 'AGRICULTURE',
  CULTURE = 'CULTURE',
  EDUCATION = 'EDUCATION',
  HEALTH = 'HEALTH',
  MAN_POWER = 'MAN_POWER',
}

interface IProfileApiCallPayload {
  type?: EType
  warLocation?: EWarLocation
  obligo?: EObligo
  bankAccount?: EBankAccount
  loanStatus?: ELoanStatus
  income?: EIncome
  victom?: EVictom
  recruted?: ERecruted
  evacuated?: EEvacuated
  damageStatus?: EDamageStatus
  domain?: EDomain
  companyName?: string
  fullName?: string
  indetifier?: string
}

export type TProfileApiCallPayload = IProfileApiCallPayload

export {
  EType,
  EWarLocation,
  EObligo,
  EBankAccount,
  ELoanStatus,
  EIncome,
  EVictom,
  ERecruted,
  EEvacuated,
  EDamageStatus,
  EDomain,
}
