/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createContext, useContext, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks'
import { TLoginApiCallResponse, TUpdateLoanRequestPayload, TVerifyLoginApiCallResponse } from '../api/types'

// @ts-ignore
const AuthContext = createContext<{
  user: TVerifyLoginApiCallResponse | null
  login: (data: TVerifyLoginApiCallResponse) => Promise<void>
  logout: () => void
  // setProfile: (status: string) => void
  updateAuthCredentials: (data: TLoginApiCallResponse) => void
  profileUpdated: string
  setProfile: (data: TUpdateLoanRequestPayload) => Promise<void>
  loanRequest: TUpdateLoanRequestPayload | null
  
}>()

export const AuthProvider = ({ children }: any) => {
  // @ts-ignore
  const [user, setUser]: [
    TVerifyLoginApiCallResponse | null,
    (data: TVerifyLoginApiCallResponse | null) => void,
  ] = useLocalStorage('user', null)
  
  // @ts-ignore
  const [loanRequest, setLoanRequest]: [
    TUpdateLoanRequestPayload | null,
    (data: TUpdateLoanRequestPayload | null) => void,
  ] = useLocalStorage(`A4U-${user?.username }` , null)
  
  const [profileUpdated, setProfileUpdated] = useLocalStorage('profile', null) as [string, (status: string) => void];
 
  const login = async (data: TVerifyLoginApiCallResponse) => {
    // Add 3600 seconds (1 hour) to the current time
    const currentTime = new Date();
    const timestamp = currentTime.getTime() + 3600 * 1000;
    data.ExpireTime = timestamp ;
    
    setUser(data)
  }

  const setProfile = async (data: TUpdateLoanRequestPayload) => {
    setLoanRequest(data)
  }


  const logout = () => {
    setUser(null)
  }

  const updateAuthCredentials = (data: TLoginApiCallResponse) => {
    // @ts-expect-error  old interface - not in use file deprected 
    setUser(data)
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      updateAuthCredentials,
      setProfile,
      profileUpdated,
      loanRequest
    }),
    [user],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
