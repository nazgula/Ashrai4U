/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
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

export interface ILoginByPhoneProps {
  onClickNext: () => void
}

export const LoginByPhone = (props: ILoginByPhoneProps) => {
  const useProfileStore = useStore(EStore.profile)
  const { onClickNext } = props
  const { login, user } = useAuth()
  const { setModal } = useModal()
  const { t } = useTranslation()
  const [input, setInput] = useState({
    identifier: '',
    verificationCode: '',
    firstName: '',
    lastName: ''
  })


  // ------ identifier = phone
  const [isValidIdentifier, setIsValidIdentifier] = useState(false)
  // ------ verification code
  const [isValidCode, setIsValidCode] = useState(false)
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


  useEffect(() => {

    if (input.verificationCode.length === 6 && !isNaN(+input.verificationCode)) {
      setIsValidCode(true)
    } 
    else {
    setIsValidCode(false)
    }
  }, [input.verificationCode])

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

        console.log('user: ', user)
        alert (`username: ${user?.username} \n AccessToken: ${user?.AccessToken}`)
        onClickNext()

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

  // --- display relevant form
  const getPhoneForm  = () : ReactNode => {
    return (
      <form className="form">
        <fieldset>
          <Input
            type="text"
            name="firstName"
            placeholder={t('first name')}
            value={input.firstName}
            error={!isValidIdentifier ? identifierErrorMessage : ''}
            onInput={onInputChange}
          />
          <Input
            type="text"
            name="lastName"
            placeholder={t('last name')}
            value={input.identifier}
            error={!isValidIdentifier ? identifierErrorMessage : ''}
            onInput={onInputChange}
          />

          <Input
            type="text"
            name="identifier"
            placeholder={t('admin.login.input.identifier-placeholder')}
            value={input.identifier}
            error={!isValidIdentifier ? identifierErrorMessage : ''}
            onInput={onInputChange}
          />
        </fieldset>

        {/* <Button isLinkView>{t('admin.login.btnLink')}</Button> */}

        <div className="form-button-group">
          <Button
            type={EButtonType.button}
            disabled={
              input.firstName.length === 0 ||
              input.lastName.length === 0 ||
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
    )
  }

  const getCodeForm  = () : ReactNode => {
    return (
      <form className="form">
        <fieldset>
          <Input
            type="text"
            name="verificationCode"
            placeholder={t('admin.login.verification-code-placeholder')}
            value={input.verificationCode}
             error={!isValidCode ? codeErrorMessage : ''}
            onInput={onInputChange}
          />
        </fieldset>

        <Button isLinkView>{t('admin.login.btnLink')}</Button>

        <div className="form-button-group">
          <Button
            type={EButtonType.button}
            disabled={
              input.verificationCode.length === 0 ||
              !isValidCode
            }
            onClick={() =>
              verificationHandler(input.verificationCode)
            }
          >
            {t('admin.login.verification-btn')}
          </Button>
        </div>
      </form>
    )
  }

  const getForm = () : ReactNode => {
    if (verifyParams.codeVerifier.length === 0 || verifyParams.session.length === 0) {
      return getPhoneForm()
    }
    else {
      return getCodeForm()
    }
  }


  return (
    <div className="login">
      <div className="login__title">{t('admin.login.title')}</div>
      <div className="login__description">{t('admin.login.description')}</div>
      {getForm()}
    </div>    
  )
}
