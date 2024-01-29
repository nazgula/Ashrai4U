/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import parsePhoneNumberFromString, { ParseError } from 'libphonenumber-js'
import { useAuth, useModal } from '@/core/context'
import { getLoanRequestApiCall, loginApiCall, updateLoanRequestApiCall, verifyLoginApiCall } from '@/core/api/calls'
import { Button, EButtonType, Input } from '@/components/ui'
import { LeftTitles } from '@/components/sections/LeftTitles'
import { TUpdateLoanRequestPayload } from '@/core/api/types'
import { ESteps } from '../Main'
import { useLocation } from 'react-router-dom'
import { getQueryParamFromLocation } from '@/utilities/utilities'


export enum EStage {
  LOGIN = 'LOGIN',
  VERIFICATION = 'VERIFICATION'
}

export interface ILoginPageProps {
  // signIn: boolean
  onClickNext: (loanRequest: TUpdateLoanRequestPayload | null) => void
}

export const LoginPage = (props: ILoginPageProps) => {
  // const useProfileStore = useStore(EStore.profile)
  const { onClickNext } = props
  const { login, user, setProfile } = useAuth()

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
  const [isValidCode, setIsValidCode] = useState(false)
  const [verifyParams, setVerifyParams] = useState({ codeVerifier: '', session: '', username: '' })
  const [isResending, setIsResending] = useState(false)
  const [stage, setStage] = useState(user && user?.username ? EStage.VERIFICATION : EStage.LOGIN)
  

  const identifierErrorMessage = t('loginPage.identifierErrorMessage')
  const codeErrorMessage = t('loginPage.codeErrorMessage')


  const location = useLocation()
  const [agentId, setAgentId] = useState(getQueryParamFromLocation(location.search, 'agentId'))


  useEffect(() => {
    console.log(user, user?.username)

    if (user && user?.username ) {
      // wait 2000 ms for script to load before calling loginHandler
      setTimeout(() => {
        loginHandler(user.username)
      }, 2000)
      loginHandler(user.username)
    }
  }, [])

  // useEffect(() => {
  //   console.log(user , user?.username )

  //   if (user && user?.username && isScriptLoaded) {
  //     loginHandler (user.username)
  //   }
  // }, [isScriptLoaded])

  useEffect(() => {
    const isPhoneNumberValid = isNumberValid(input.identifier)

    if (input.identifier.length === 0) setIsValidIdentifier(true)
    else if (isPhoneNumberValid && input.identifier.length > 0) setIsValidIdentifier(true)
    else setIsValidIdentifier(false)

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
      if (stage === EStage.LOGIN) setStage(EStage.VERIFICATION)
      const response = await loginApiCall(phone)

      if (response) setVerifyParams(response)

    } catch (error) {
      console.log(error)
    }
  }

  const verificationHandler = async (code: string) => {
    try {
      const vPayload = { code: code, ...verifyParams }
      let response = await verifyLoginApiCall(vPayload)

      if (response) {
        login({ ...response, username: vPayload.username })
        console.log('user: ', user)

        if (user) {
          try {
            // get loan request, update storage and sefine next step
            const loanRequest = await getLoanRequestApiCall(user)
            console.log('loanRequest', loanRequest)
            // if first/last name are missing (first login) or new agentId
            if (loanRequest) {
              const uPayload : TUpdateLoanRequestPayload = {}
              if (loanRequest?.firstName === 'N/A') 
                { 
                  uPayload.firstName = input.firstName
                  loanRequest.firstName = input.firstName
                }
              if (loanRequest?.lastName === 'N/A') {
                  uPayload.lastName = input.lastName
                  loanRequest.lastName = input.lastName
                }
              if (agentId !== '' && loanRequest.agentId !== agentId) {
                uPayload.agentId = agentId
                loanRequest.agentId = agentId
              }

    
              if ( Object.keys(uPayload).length > 0) {
                try {
                  response = await updateLoanRequestApiCall(uPayload, user)
                } catch (error) {
                  // @ts-ignore
                  alert (error.message) 
                }
              }

              setProfile(loanRequest as TUpdateLoanRequestPayload)

            }

            console.log('get loan request: ', loanRequest)
            onClickNext(loanRequest)

          } catch (error) {
            console.log ('user not found:' , user, error)
            onClickNext(null)
          }
        }
        else {
          onClickNext(null)
        }

      }
    } catch (error) {
      console.log(error)
      // @ts-ignore
      alert(error?.message || 'error')
    }
  }

  // ------------- render -------------

  const getfirstNameInput = (): ReactNode => {
    if (stage === EStage.LOGIN) {
      return (
        <Input type="text" name="firstName" placeholder={t('loginPage.firstName')} value={input.firstName} onInput={onInputChange} />
      )
    }
    else {
      return null
    }
  }

  const getlastNameInput = (): ReactNode => {
    if (stage === EStage.LOGIN) {
      return (
        <Input type="text" name="lastName" placeholder={t('loginPage.lastName')} value={input.lastName} onInput={onInputChange} />
      )
    }
    else {
      return null
    }
  }

  const getIdentifierInput = (): ReactNode => {
    if (stage === EStage.LOGIN) {
      return (
        <Input type="text" name="identifier" placeholder={t('loginPage.phonePlaceholder')}
          value={input.identifier} error={!isValidIdentifier ? identifierErrorMessage : ''} onInput={onInputChange}
        />
      )
    }
    else {
      return null
    }
  }

  const getVerificationCodeInput = (): ReactNode => {
    if (stage === EStage.VERIFICATION) {
      return (
        <Input type="text" name="verificationCode" value={input.verificationCode}
          placeholder={t('loginPage.verificationPlaceholder')}
          error={!isValidCode ? codeErrorMessage : ''} onInput={onInputChange}
        />
      )
    }
    else {
      return null
    }
  }

  const getResendAndChangePhone = (): ReactNode => {

    if (stage === EStage.VERIFICATION) {
      return (
        <div className="flex justify-between">
          <Button isLinkView={true} className="text-sm text-black"
            onClick={() => {
              setIsResending(true)
              loginHandler(user?.username || '')
            }}>
            {t('loginPage.sendAgain')}
          </Button>
          <Button isLinkView={true} className="text-sm text-black" onClick={() => {
            setStage(EStage.LOGIN); setVerifyParams({ codeVerifier: '', session: '', username: '' })
          }}>
            {t('loginPage.changePhone')}
          </Button>
        </div>
      )
    }
    else {
      return null
    }
  }

  const getButton = (): ReactNode => {

    if (stage === EStage.LOGIN) {
      return (
        <Button
          type={EButtonType.button}
          disabled={
            input.firstName.length === 0 || input.lastName.length === 0 || input.identifier.length === 0 || !isValidIdentifier
          }
          onClick={() => loginHandler(input.identifier)}
        >
          {t('loginPage.sendCode')}
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
          {t('loginPage.next')}
        </Button>
      )
    }
  }

  const getFormatedPhone = (): string => {
    const originalString = user && user?.username || input.identifier
    // return `${originalString.slice(-4)}`
    if (originalString.length > 0)
      return `${originalString.slice(-2)}${'*'.repeat(originalString.length - 6)}-${originalString.substring(0, 4)}`
    else return ''

  }

  console.log('getFormatedPhone', getFormatedPhone())
  return (
    <div>
      <LeftTitles title={`loginPage.title.${stage}`} description={`loginPage.subTitle.${stage}`}
        subTitleParam={stage == EStage.VERIFICATION ? { phone: getFormatedPhone() } as object : undefined} className='' />
      {/* {getForm()} */}

      <form className="form">
        <fieldset>
          {getfirstNameInput()}
          {getlastNameInput()}
          {getIdentifierInput()}
          {getVerificationCodeInput()}
          {getResendAndChangePhone()}
        </fieldset>

        <div className="form-button-group">
          {getButton()}
        </div>
      </form>

    </div>
  )
}
