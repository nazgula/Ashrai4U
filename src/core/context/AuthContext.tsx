/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks'
import { TLoginApiCallResponse } from '../api/types'

// @ts-ignore
const AuthContext = createContext<{
  user: TLoginApiCallResponse | null
  login: (data: TLoginApiCallResponse) => Promise<void>
  logout: () => void
  setProfile: (status: string) => void
  updateAuthCredentials: (data: TLoginApiCallResponse) => void
  profileUpdated: string
}>()

export const AuthProvider = ({ children }: any) => {
  // @ts-ignore
  const [user, setUser]: [
    TLoginApiCallResponse | null,
    (data: TLoginApiCallResponse | null) => void,
  ] = useLocalStorage('user', null)
  const [profileUpdated, setProfileUpdated] = useLocalStorage('profile', null) as [string, (status: string) => void];
  const login = async (data: TLoginApiCallResponse) => {
    setUser(data)
  }

  const setProfile = async (status: string) => {
    console.log(`status ${status}`)
    if(status){
      setProfileUpdated(status)
    }
  }


  const logout = () => {
    setUser(null)
  }

  const updateAuthCredentials = (data: TLoginApiCallResponse) => {
    setUser(data)
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      updateAuthCredentials,
      setProfile,
      profileUpdated
    }),
    [user],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
