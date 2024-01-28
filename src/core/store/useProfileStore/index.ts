import { createStoreOption } from 'react-pinia'
import { IProfileInitialState } from './types'
import { EEmplymentType, ELoanReason, EMaritalStatus } from '@/core/api/types'


export const useProfileStore: createStoreOption = {
  state: (): IProfileInitialState => {
    return {
      profile: {
        // accountId: '',
        // companyName: '',
        // fullName: '',
        // indetifier: '',
        // phone: '',
        // codeVerifier: '',
        // firstName: '',
        // lastName: '',
        // loanAmount: '',
        // loanPeriod: '',
        // loanReason: ''
        phone: '',
        codeVerifier: '',
        agentId: '',
        username: '',
        firstName: '',
        lastName: '',
        resone: '' as ELoanReason,
        carYear: '',
        carValue: '',
        carBrand: '',
        requestedLoan: '',
        monthlyReturn: '',
        employmentType: '' as EEmplymentType,
        maritalStatus: '' as EMaritalStatus,
        partnerEmploymentType: '' as EEmplymentType,
        salary: '',
        alimony: '',
        pension: '',
        allowance: '',
        rent: ''

      }
    }
  },
  getters: {
    // getProfile: (state) => {
    //   return state.profile
    // },
  },
  actions: {
    updateProfile(payload: IProfileInitialState) {
      Object.assign(this.profile, { ...payload })
      console.log(this)
    },
  },
  persist: {
    key: 'useProfileStore',
    storage: 'localStorage',
  },
  deep: true,
}
