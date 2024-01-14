import { useCallback, useState } from 'react'
import { useAuth } from '../context'
import { EEndpoint, apiRequest } from '../api'
import { EUserApiPath } from '../api/types'

export const useTokenReset = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user, logout, updateAuthCredentials }: any = useAuth()
  const [resettingToken, setResettingToken] = useState(false)

  const resetToken = useCallback(async () => {
    try {
      setResettingToken(true)

      const response = await apiRequest({
        apiEndpoint: EEndpoint.user,
        path: EUserApiPath.refresh,
        options: {
          method: 'POST',
          body: JSON.stringify({
            username: user.Identifier,
            refreshToken: user.RefreshToken,
          }),
        },
      })

      updateAuthCredentials({ ...user, ...response })

      return { ...user, ...response }
    } catch (error) {
      logout()
    } finally {
      setResettingToken(false)
    }
  }, [])

  return { resetToken, resettingToken }
}
