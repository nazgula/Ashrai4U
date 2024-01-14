import { createStore } from 'react-pinia'
import { useProfileStore } from './useProfileStore'

export enum EStore {
  profile = 'useProfileStore',
}

export const store = createStore({
  useProfileStore,
})
