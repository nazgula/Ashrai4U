/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks'
import { TLoginApiCallResponse, TVerifyLoginApiCallResponse } from '../api/types'

// @ts-ignore
const AuthContext = createContext<{
  user: TVerifyLoginApiCallResponse | null
  login: (data: TVerifyLoginApiCallResponse) => Promise<void>
  logout: () => void
  setProfile: (status: string) => void
  updateAuthCredentials: (data: TLoginApiCallResponse) => void
  profileUpdated: string
  
  // codeVerifier: string
  // setCodeVerifier: (codeVerifier: string) => void
  // session: string
  // setSession: (session: string) => void
}>()

export const AuthProvider = ({ children }: any) => {
  // @ts-ignore
  const [user, setUser]: [
    TVerifyLoginApiCallResponse | null,
    (data: TVerifyLoginApiCallResponse | null) => void,
  ] = useLocalStorage('user', null)
  const [profileUpdated, setProfileUpdated] = useLocalStorage('profile', null) as [string, (status: string) => void];
  // const [session, setSession] = useLocalStorage('session', '') as [string, (session: string) => void];
  // const [codeVerifier, setCodeVerifier] = useLocalStorage('codeVerified', '') as [string, (codeVerifier: string) => void];

  const login = async (data: TVerifyLoginApiCallResponse) => {
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
      profileUpdated
      // ,
      // session,
      // setSession,
      // codeVerifier,
      // setCodeVerifier
    }),
    [user],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
