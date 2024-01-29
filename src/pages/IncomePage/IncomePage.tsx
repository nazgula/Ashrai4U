/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useStore } from 'react-pinia'
import parsePhoneNumberFromString, { ParseError } from 'libphonenumber-js'

import { EStore } from '@/core/store'
import { useAuth, useModal } from '@/core/context'
import { updateLoanRequestApiCall } from '@/core/api/calls'
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
  const {  user } = useAuth()
  const { t } = useTranslation()
  const [input, setInput] = useState({
    salary: '',
    alimony: '',
    pension: '',
    allowance: '',
    rent: '',
  })


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
      // onClickNext()
      // return
      if (user) {
        try {
          const response =   await updateLoanRequestApiCall({salary: salary, alimony: alimony, pension: pension, allowance: allowance, rent: rent}, user)
  
          if (response) {
            console.log ('save income response', response)
            onClickNext()
          }
        } catch (error) {
          console.log(error)
        } 
      }
      else {
        // Alert ERROR
        console.log('user not found')
      }
      
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
        <fieldset className='flex flex-col items-center w-full'>
          <Input type="text" name="salary" value={input.salary} placeholder={t('incomePage.salary')} onInput={onInputChange}/>
          <div className="text-xl text-justify text-sky">{t('incomePage.extraIncome')}</div>
          <Input type="text" name="alimony" value={input.alimony} placeholder={t('incomePage.alimony')} onInput={onInputChange} className="w-1/2"/>
          <Input type="text" name="pension" value={input.pension} placeholder={t('incomePage.pension')} onInput={onInputChange} className="w-1/2"/>
          <Input type="text" name="allowance" value={input.allowance} placeholder={t('incomePage.allowance')} onInput={onInputChange} className="w-1/2"/>
          <Input type="text" name="rent" value={input.rent} placeholder={t('incomePage.rent')} onInput={onInputChange} className="w-1/2"/>
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
