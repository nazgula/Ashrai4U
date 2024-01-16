import { createStoreOption } from 'react-pinia'
import { IProfileInitialState } from './types'

export const useProfileStore: createStoreOption = {
  state: (): IProfileInitialState => {
    return {
      profile: {
        accountId: '',
        companyName: '',
        fullName: '',
        indetifier: '',
        phone: '',
        codeVerifier: '',
        firstName: '',
        lastName: '',
        loanAmount: '',
        loanPeriod: '',
        loanReason: ''
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
