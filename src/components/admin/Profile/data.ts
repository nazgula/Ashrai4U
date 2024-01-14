import {
  EBankAccount,
  EDamageStatus,
  EDomain,
  EEvacuated,
  EIncome,
  ELoanStatus,
  EObligo,
  ERecruted,
  EType,
  EVictom,
  EWarLocation,
} from '@/core/api/types'

const dataGenerator = (
  ENUM: { [s: string]: string | number } | ArrayLike<string>,
) => {
  return Object.entries(ENUM).map(([key, value]) => ({ key, value }))
}

export const TypeList = dataGenerator(EType)
export const WarLocationList = dataGenerator(EWarLocation)
export const ObligoList = dataGenerator(EObligo)
export const BankAccountList = dataGenerator(EBankAccount)
export const LoanStatusList = dataGenerator(ELoanStatus)
export const IncomeList = dataGenerator(EIncome)
export const VictomList = dataGenerator(EVictom)
export const RecrutedList = dataGenerator(ERecruted)
export const EvacuatedList = dataGenerator(EEvacuated)
export const DamageStatusList = dataGenerator(EDamageStatus)
export const DomainList = dataGenerator(EDomain)

export const dropdownList = [
  // {
  //   key: 'type',
  //   label: 'Type',
  //   data: TypeList,
  // },
  {
    key: 'warLocation',
    label: 'War Location',
    data: WarLocationList,
  },
  {
    key: 'obligo',
    label: 'Obligo',
    data: ObligoList,
  },
  {
    key: 'bankAccount',
    label: 'Bank Account',
    data: BankAccountList,
  },
  {
    key: 'loanStatus',
    label: 'Loan Status',
    data: LoanStatusList,
  },
  {
    key: 'income',
    label: 'Income',
    data: IncomeList,
  },
  {
    key: 'victom',
    label: 'Victom',
    data: VictomList,
  },
  {
    key: 'recruted',
    label: 'Recruted',
    data: RecrutedList,
  },
  {
    key: 'evacuated',
    label: 'Evacuated',
    data: EvacuatedList,
  },
  {
    key: 'damageStatus',
    label: 'Damage Status',
    data: DamageStatusList,
  },
  {
    key: 'domain',
    label: 'Domain',
    data: DomainList,
  },
]
