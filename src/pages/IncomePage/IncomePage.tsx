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
import { Console } from 'console'


export interface IIncomePageProps {
  onClickNext: () => void
}

export const IncomePage = (props: IIncomePageProps) => {
  const useProfileStore = useStore(EStore.profile)
  const { onClickNext } = props
  const { login, user } = useAuth()
  const { setModal } = useModal()
  const { t } = useTranslation()
  const [input, setInput] = useState({
    salary: '',
    alimony: '',
    pension: '',
    allowance: '',
    rent: '',
  })


  // // ------ identifier = phone
  // const [isValidIdentifier, setIsValidIdentifier] = useState(false)
  // // ------ verification code
  // const [isValidCode, setIsValidCode] = useState(false)
  // // ------ login
  // const [verifyParams, setVerifyParams] = useState({codeVerifier: '', session: '', username: ''})
  // const [isResending, setIsResending] = useState(false)

  // const identifierErrorMessage = t('admin.login.identifierErrorMessage')
  // const codeErrorMessage = t('admin.login.codeErrorMessage')

  // useEffect(() => {
  //   const isPhoneNumberValid = isNumberValid(input.identifier)

  //   if (input.identifier.length === 0) {
  //     setIsValidIdentifier(true)
  //   } else if (
  //   isPhoneNumberValid && input.identifier.length > 0
  //   ) {
  //     setIsValidIdentifier(true)
  //   } else {
  //     setIsValidIdentifier(false)
  //   }
  // }, [input.identifier])


  // useEffect(() => {
  //   if (input.verificationCode.length === 6 && !isNaN(+input.verificationCode) || input.verificationCode.length === 0) {
  //     setIsValidCode(true)
  //   } 
  //   else {
  //     setIsValidCode(false)
  //   }
  // }, [input.verificationCode])

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

  const incomeHandler = async (salary: string, alimony: string, pension: string, allowance: string, rent: string) => {
    try {
      console.log('incomeHandler:', salary, alimony, pension, allowance, rent)
      onClickNext()
      return
      // if (user) {
      //   try {
      //     const response =   await updateLoanRequestApiCall({resone: selectedValue}, user)
  
      //     if (response) {
      //       console.log ('save goal response', response)
      //       onClickNext()
      //     }
      //   } catch (error) {
      //     console.log(error)
      //   } 
      // }
      // else {
      //   // Alert ERROR
      //   console.log('user not found')
      // }
      
    } catch (error) {
      console.log(error)
    }
  }

// ------------- render -------------


  return (
    <div>
      <LeftTitles title="incomePage.title" description="incomePage.subTitle" showLoanAmount={true}/>
      {/* {getForm()} */}

      <form className="form">
        <fieldset className='w-full flex flex-col items-center'>
          <Input type="text" name="salary" value={input.salary} placeholder={t('incomePage.salary')} onInput={onInputChange}/>
          <div>{t('incomePage.extraIncome')}</div>
          <Input type="text" name="alimony" value={input.alimony} placeholder={t('incomePage.alimony')} onInput={onInputChange}/>
          <Input type="text" name="pension" value={input.pension} placeholder={t('incomePage.pension')} onInput={onInputChange}/>
          <Input type="text" name="allowance" value={input.allowance} placeholder={t('incomePage.allowance')} onInput={onInputChange}/>
          <Input type="text" name="rent" value={input.rent} placeholder={t('incomePage.rent')} onInput={onInputChange}/>
        </fieldset>
        
        <div className="form-button-group">
          <Button type={EButtonType.button} onClick={() => incomeHandler(input.salary, input.alimony, input.pension, input.allowance, input.rent)} disabled={input.salary.length === 0}>
            
          {t('incomePage.next')}
        </Button>
        </div>
      </form>

    </div>    
  )
}
