/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useStore } from 'react-pinia'
import parsePhoneNumberFromString, { ParseError } from 'libphonenumber-js'

import { EStore } from '@/core/store'
import { useAuth, useModal } from '@/core/context'
import { getProfileApiCall, loginApiCall, verifyLoginApiCall } from '@/core/api/calls'
import { EType, TLoginApiCallResponse } from '@/core/api/types'

import { Button, EButtonType, Input } from '@/components/ui'



import './style.scss'

interface IPasswordCheck {
  text: string
  isValid: boolean
}

interface ILoginVerification {
  codeVerifier: string
  session: string
}

export const LoginByPhone = () => {
  const useProfileStore = useStore(EStore.profile)
  const { login } = useAuth()
  const { setModal } = useModal()
  const { t } = useTranslation()
  const [input, setInput] = useState({
    identifier: '',
    verificationCode: ''
  })


  // ------ identifier = phone
  const [isValidIdentifier, setIsValidIdentifier] = useState(false)
  // ------ verification code
  const [isValidICode, setIsValidCode] = useState(false)
  // ------ login
  const [verifyParams, setVerifyParams] = useState({codeVerifier: '', session: '', username: ''})

  const identifierErrorMessage = t('admin.login.identifierErrorMessage')
  const codeErrorMessage = t('admin.login.codeErrorMessage')

  useEffect(() => {
    const isPhoneNumberValid = isNumberValid(input.identifier)

    if (input.identifier.length === 0) {
      setIsValidIdentifier(true)
    } else if (
    isPhoneNumberValid && input.identifier.length > 0
    ) {
      setIsValidIdentifier(true)
    } else {
      setIsValidIdentifier(false)
    }
  }, [input.identifier])



// isNaN(+maybeNumber)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const isNumberValid = (number: string) => {
    try {
      const phoneNumberObject = parsePhoneNumberFromString(number, 'IL')
      return phoneNumberObject && phoneNumberObject.isValid()
    } catch (error) {
      if (error instanceof ParseError) {
        return false
      } else {
        return false
      }
    }
  }

  const loginHandler = async (phone: string) => {
    try {
      const response = await loginApiCall(phone)

      if (response)  setVerifyParams(response)
      
    } catch (error) {
      console.log(error)
    }
  }

  const verificationHandler = async (code: string) => {
    try {
      const callPayload = {code: code, ...verifyParams}
      const response = await verifyLoginApiCall(callPayload)

      if (response) {
        login({ ...response, username: callPayload.username })
        setModal(null)

        // const profileData = await getProfileApiCall({
        //   ...response,
        //   UserName: input.identifier,
        // })
        // useProfileStore.updateProfile({ ...profileData, type: EType.COMPANY })
  
       }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="login">
      <div className="login__title">{t('admin.login.title')}</div>
      <div className="login__description">{t('admin.login.description')}</div>

      <form className="login-form">
        <fieldset>
          <Input
            type="text"
            name="identifier"
            placeholder={t('admin.login.input.identifier-placeholder')}
            value={input.identifier}
            error={!isValidIdentifier ? identifierErrorMessage : ''}
            onInput={onInputChange}
          />
        </fieldset>

        <Button isLinkView>{t('admin.login.btnLink')}</Button>

        <div className="login-form__btn-group">
          <Button
            type={EButtonType.button}
            disabled={
              input.identifier.length === 0 ||
              !isValidIdentifier
            }
            onClick={() =>
              loginHandler(input.identifier)
            }
          >
            {t('admin.login.btnGroup')}
          </Button>
        </div>
      </form>

      <form className="verification-form">
        <fieldset>
          <Input
            type="text"
            name="verificationCode"
            placeholder={t('admin.login.input.identifier-placeholder')}
            value={input.verificationCode}
             error={!isValidICode ? codeErrorMessage : ''}
            onInput={onInputChange}
          />
        </fieldset>

        <Button isLinkView>{t('admin.login.btnLink')}</Button>

        <div className="login-form__btn-group">
          <Button
            type={EButtonType.button}
            // disabled={
            //   input.identifier.length === 0 ||
            //   !isValidIdentifier
            // }
            onClick={() =>
              verificationHandler(input.verificationCode)
            }
          >
            {t('admin.login.btnGroup')}
          </Button>
        </div>
      </form>
    </div>    
  )
}
