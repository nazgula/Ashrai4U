/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useStore } from 'react-pinia'
import parsePhoneNumberFromString, { ParseError } from 'libphonenumber-js'

import { EStore } from '@/core/store'
import { useAuth, useModal } from '@/core/context'
import { loginApiCall, updateLoanRequestApiCall, verifyLoginApiCall } from '@/core/api/calls'
import { Button, EButtonType, Input } from '@/components/ui'



// import './style.scss'
import { LeftTitles } from '@/components/sections/LeftTitles'
import { use } from 'i18next'
import { TUpdateLoanRequestPayload } from '@/core/api/types'


export interface ILoginPageProps {
  onClickNext: () => void
}

export const LoginPage = (props: ILoginPageProps) => {
  // const useProfileStore = useStore(EStore.profile)
  const { onClickNext } = props
  const { login, user, loanRequest, setProfile } = useAuth()
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
  const [isResending, setIsResending] = useState(false)

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
    if (input.verificationCode.length === 6 && !isNaN(+input.verificationCode) || input.verificationCode.length === 0) {
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
      const vPayload = {code: code, ...verifyParams}
      let response = await verifyLoginApiCall(vPayload)

      if (response) {
        login({ ...response, username: vPayload.username })
        console.log('user: ', user)

        if (user) {
          try {
            
             const uPayload = {firstName: input.firstName, lastName: input.lastName}
            
            response =   await updateLoanRequestApiCall(uPayload, user)
            // storage
            setProfile(uPayload as TUpdateLoanRequestPayload)
            console.log('get profile key: ', loanRequest?.firstName, loanRequest?.lastName, loanRequest?.resone)
           
            if (response) onClickNext()
          } catch (error) {
            console.log(error)
          } 
        }
        else {
          // Alert ERROR
          console.log('user not found')
        }
  
       }
    } catch (error) {
      console.log(error)
    }
  }

  
// ------------- render -------------

  const getfirstNameInput = () : ReactNode => {
    if (verifyParams.codeVerifier.length === 0 || verifyParams.session.length === 0) {
      return (
        <Input type="text" name="firstName" placeholder={t('firstName')} value={input.firstName} onInput={onInputChange}/>
      )
    }
    else {
      return null
    }
  }

  const getlastNameInput = () : ReactNode => {
    if (verifyParams.codeVerifier.length === 0 || verifyParams.session.length === 0) {
      return (
        <Input type="text" name="lastName" placeholder={t('lastName')} value={input.lastName} onInput={onInputChange}/>
      )
    }
    else {
      return null
    }
  }

  const getIdentifierInput = () : ReactNode => {
    if (verifyParams.codeVerifier.length === 0 || verifyParams.session.length === 0) {
      return (
        <Input type="text" name="identifier" placeholder={t('admin.login.input.identifier-placeholder')}
          value={input.identifier} error={!isValidIdentifier ? identifierErrorMessage : ''} onInput={onInputChange}
        />
      )
    }
    else {
      return null
    }
  }

  const getVerificationCodeInput = () : ReactNode => {
    if (verifyParams.codeVerifier.length > 0 && verifyParams.session.length > 0) {
      return (
        <Input type="text" name="verificationCode" value={input.verificationCode}
          placeholder={t('admin.login.verification-code-placeholder')}
          error={!isValidCode ? codeErrorMessage : ''} onInput={onInputChange}
        />
      )
    }
    else {
      return null
    }
  }

  const getResendAndChangePhone = () : ReactNode => {
    
    if (verifyParams.codeVerifier.length > 0 && verifyParams.session.length > 0) {
      return (
        <div className="flex justify-between">
          <Button isLinkView={true} className="text-sm text-black" 
          onClick={() => { 
              setIsResending(true) 
              loginHandler(input.identifier)
            }}>
            {t('login.send-again')}
          </Button>
          <Button isLinkView={true} className="text-sm text-black" onClick={() => setVerifyParams({codeVerifier: '', session: '', username: ''})}>
            {t('login.change-phone')}
          </Button>
        </div>
      )
    }
    else {
      return null
    }
  }

  const getButton = () : ReactNode => {
    
    if (verifyParams.codeVerifier.length === 0 || verifyParams.session.length === 0) {
      return (
        <Button
          type={EButtonType.button}
          disabled={
            input.firstName.length === 0 || input.lastName.length === 0 || input.identifier.length === 0 || !isValidIdentifier
          }
          onClick={() => loginHandler(input.identifier)}
        >
          {t('admin.login.btnGroup')}
        </Button>
      )
    }
    else {
      return (
        <Button
          type={EButtonType.button}
          disabled={input.verificationCode.length === 0 || !isValidCode}
          onClick={() => verificationHandler(input.verificationCode)}
        >
          {t('admin.login.verification-btn')}
        </Button>
      )
    }
  }

  return (
    <div>
      <LeftTitles title="admin.login.title" description="admin.login.description" />
      {/* {getForm()} */}

      <form className="form">
        <fieldset>
          {getfirstNameInput()}
          {getlastNameInput()}
          {getIdentifierInput()}
          {getVerificationCodeInput()}
          {getResendAndChangePhone()}
          {/* {getChangePhone()} */}
        </fieldset>
        
        <div className="form-button-group">
          {getButton()}
        </div>
      </form>

    </div>    
  )
}
