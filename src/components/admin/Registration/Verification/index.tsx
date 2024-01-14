/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useReducer, useCallback, useEffect } from 'react'
import { t } from 'i18next'

import { useAuth } from '@/core/context'
import {
  deleteUserApiCall,
  loginApiCall,
  signUpApiCall,
  verifyUserApiCall,
} from '@/core/api/calls'
import {
  TSignUpApiCallPayload,
  TVerifyApiCallPayload,
} from '@/core/api/types/user'

import { OTPField, Timer } from '@/components/smart'
import { Button, EButtonType } from '@/components/ui'

interface IVerificationProps {
  regData: TSignUpApiCallPayload
  onSubmit: ({ step }: { step: number }) => void
}

export const Verification = ({ onSubmit, regData }: IVerificationProps) => {
  const { login } = useAuth()
  const [currentCode, setCurrentCode] = useState<string[]>()
  const [codeError, setCodeError] = useState<boolean>(false)
  const [timerError, setTimerError] = useState<boolean>(false)
  const [isCodeFilled, setCodeFilled] = useState(false)

  const [_, forceUpdate] = useReducer((x) => x + 1, 0)

  const handleCurrentCodeChange = useCallback((value: string[]) => {
    setCurrentCode(value)
    setCodeError(false)
  }, [])

  const handleTimerReset = useCallback(() => {
    forceUpdate()
  }, [_])

  const stopTimerHandler = useCallback(() => {
    setTimerError(true)
  }, [])

  useEffect(() => {
    setCodeFilled(!!currentCode && currentCode.every((item) => item !== ''))
  }, [currentCode])

  const verificationHandler = async (payload: TVerifyApiCallPayload) => {
    try {
      await verifyUserApiCall(payload)

      const response = await loginApiCall({
        username: regData.username,
        password: regData.password,
      })
      if (response) {
        login({ ...response, UserName: payload.username })
        onSubmit({ step: 3 })
      }
    } catch (error: any) {
      if (error.message.match(/401|BAD_CREDENTIALS/gm)) {
        setCodeError(true)
      }
      console.log(error)
    }
  }

  const sendNewCodeHandler = useCallback(async () => {
    setTimerError(false)
    handleTimerReset()
    console.log('regData: ', regData)

    try {
      await deleteUserApiCall({ ...regData })
      await signUpApiCall({ ...regData })
    } catch (error: any) {
      console.log(error.message)
    }
  }, [timerError])

  return (
    <div className="verification">
      <div className="verification__container">
        <div className="verification-otp-block">
          <OTPField
            onChange={handleCurrentCodeChange}
            error={timerError || codeError}
          />
          <div className="verification-otp-block__controller">
            <div className="verification-otp-block__timer">
              {t('admin.registration.verification.timer')}:&nbsp;
              <Timer onReset={handleTimerReset} onEndTimer={stopTimerHandler} />
            </div>
            <Button
              isLinkView
              disabled={!timerError}
              onClick={sendNewCodeHandler}
            >
              {t('admin.registration.verification.newCode')}
            </Button>
          </div>
          <div className="verification-otp-block__error">
            {timerError
              ? t('admin.registration.verification.error.expired')
              : codeError
                ? t('admin.registration.verification.error.invalidCode')
                : ''}
          </div>
        </div>
      </div>

      <Button
        type={EButtonType.button}
        disabled={!isCodeFilled || timerError}
        onClick={() =>
          verificationHandler({
            username: regData.username,
            code: (currentCode && currentCode.join('')) || '',
          })
        }
      >
        {t('admin.registration.submit')}
      </Button>
    </div>
  )
}
