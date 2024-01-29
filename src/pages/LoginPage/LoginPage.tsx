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


export enum EStage {
  LOGIN = 'LOGIN',
  VERIFICATION = 'VERIFICATION'
}

export interface ILoginPageProps {
  // signIn: boolean
  onClickNext: (loanRequest: TUpdateLoanRequestPayload) => void
}

export const LoginPage = (props: ILoginPageProps) => {
  // const useProfileStore = useStore(EStore.profile)
  const { onClickNext } = props
  const { login, user, setProfile, isScriptLoaded } = useAuth()

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

  useEffect(() => {
    console.log(user, user?.username)

    if (user && user?.username && isScriptLoaded) {
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

            // if first name or last name are missing from the loan request save them
            if (loanRequest && !loanRequest.firstName || !loanRequest.lastName) {
              const uPayload = { firstName: input.firstName, lastName: input.lastName }
              response = await updateLoanRequestApiCall(uPayload, user)
              // storage
              setProfile(uPayload as TUpdateLoanRequestPayload)
            }
            else {
              Object.keys(loanRequest).forEach((key) => {
                // Check if the property value is "N/A"
                if (loanRequest[key] === 'N/A') {
                  // Update the property value to an empty string
                  loanRequest[key] = '';
                }
              });
              setProfile(loanRequest as TUpdateLoanRequestPayload)
            }

            console.log('get loan request: ', loanRequest)
            onClickNext(loanRequest)

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

  // ------------- define which step is next
  const getNextStep = (loanRequest: TUpdateLoanRequestPayload): ESteps => {
    // acording to the loan request and user pages define which is the users next needed step - use step order
    if (!loanRequest.resone) return ESteps.GOAL
    else if (!loanRequest.requestedLoan || loanRequest.requestedLoan === '0' ||
      !loanRequest.monthlyReturn || loanRequest.monthlyReturn === '0') return ESteps.LOAN
    else if (!loanRequest.employmentType) return ESteps.EMPLOYMENT
    else if (!loanRequest.maritalStatus) return ESteps.MERITAL_STATUS
    else if (!loanRequest.partnerEmploymentType && loanRequest.maritalStatus === 'MARRIED') return ESteps.MERITAL_STATUS
    else if (!loanRequest.salary || loanRequest.salary === '0') return ESteps.INCOME
    else return ESteps.WHATSAPP
  }
  // ------------- render -------------

  const getfirstNameInput = (): ReactNode => {
    if (stage === EStage.LOGIN) {
      return (
        <Input type="text" name="firstName" placeholder={t('firstName')} value={input.firstName} onInput={onInputChange} />
      )
    }
    else {
      return null
    }
  }

  const getlastNameInput = (): ReactNode => {
    if (stage === EStage.LOGIN) {
      return (
        <Input type="text" name="lastName" placeholder={t('lastName')} value={input.lastName} onInput={onInputChange} />
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
    return `${originalString.slice(-4)}`
    // return `${originalString.substring(0, 4)}${'x'.repeat(originalString.length - 6)}${originalString.slice(-2)}`
  }

  console.log('getFormatedPhone', getFormatedPhone())
  return (
    <div>
      <LeftTitles title={`loginPage.title.${stage}`} description={`loginPage.subTitle.${stage}`}
        titleParam={stage == EStage.VERIFICATION ? { phone: getFormatedPhone() } as object : undefined} />
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
