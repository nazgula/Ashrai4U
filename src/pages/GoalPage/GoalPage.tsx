import { useRef, useEffect, ChangeEvent, useState, ReactNode } from 'react'
import './style.scss'

import { Button, Input, RadioButtonGroup } from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { ELoanReason, TUpdateLoanRequestPayload } from '@/core/api/types'
import { LeftTitles } from '@/components/sections/LeftTitles'
import { updateLoanRequestApiCall } from '@/core/api/calls'
import { useAuth } from '@/core/context'
import parsePhoneNumberFromString, { ParseError } from 'libphonenumber-js'


export interface IGoalPageProps {
  onClickNext: () => void
}

export const GoalPage = (props: IGoalPageProps) => {
  const { onClickNext } = props
  const [reason, setReason] = useState('' as ELoanReason)
  const { t } = useTranslation()
  const { user } = useAuth()
  const [input, setInput] = useState({ carBrand: '', carYear: '', carValue: '' })
  const [isValidCarYear, setIsValidCarYear] = useState(true)
  const [isValidCarValue, setIsValidCarValue] = useState(true)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const carYearErrorMessage = t('goalPage.carYearErrorMessage')
  const carValueErrorMessage = t('goalPage.carValueErrorMessage')

  // useEffect(() => {
  //   const isNumericValue = !isNaN(+input.carValue);

  //   if (input.carValue.length === 0) setIsValidCarValue(true)
  //   else if (isNumericValue && input.carValue.length > 0) setIsValidCarValue(true)
  //   else setIsValidCarValue(false)

  // }, [input.carValue])

  // useEffect(() => {
  //   const isNumericValue = !isNaN(+input.carYear);

  //   if (input.carYear.length === 0 || isNumericValue && input.carValue.length === 4) setIsValidCarYear(true)
  //   else setIsValidCarValue(false)

  // }, [input.carValue])


  const saveGoalHandler = async () => {
    // onClickNext()
    // return

    if (user) {
      try {
        const payload = { reason: reason } as TUpdateLoanRequestPayload
        if (reason === ELoanReason.CAR) {
          payload.carYear = input.carYear
          payload.carBrand = input.carBrand
          payload.carValue = input.carValue
        }
        const response = await updateLoanRequestApiCall(payload, user)

        if (response) {
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
  }

  const radioList = [
    {
      value: ELoanReason.LODGING,
      name: 'button-types',
      label: t('goalPage.goalDescriptionRadioGroup.lodging'),
    },
    {
      value: ELoanReason.CAR,
      name: 'button-types',
      label: t('goalPage.goalDescriptionRadioGroup.car'),
    },
    {
      value: ELoanReason.LOANS,
      name: 'button-types',
      label: t('goalPage.goalDescriptionRadioGroup.loans'),
    },
    {
      value: ELoanReason.OTHER,
      name: 'button-types',
      label: t('goalPage.goalDescriptionRadioGroup.other'),
    },
  ]

  const radioGroupHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value as ELoanReason)
  }


  const getCarInputs = (): ReactNode => {
    console.log(reason)
    if (reason === ELoanReason.CAR) {
      return (
        <div className="flex w-full space-between">
          <Input type="text" name="carBrand" placeholder={t('goalPage.carBrand')} value={input.carBrand} onInput={onInputChange} className="w-[35%]" />
          <Input type="text" name="carYear" placeholder={t('goalPage.carYear')} value={input.carYear} onInput={onInputChange} error={!isValidCarYear || input.carYear.length >= 4 ? carYearErrorMessage : ''} className="w-[25%] mx-1" />
          <Input type="text" name="carValue" placeholder={t('goalPage.carPrice')} value={input.carValue} onInput={onInputChange} error={!isValidCarValue ? carValueErrorMessage : ''} className="w-[40%]" />
        </div>
      )
    }
    else {
      return null
    }
  }
  return (

    <div className="flex flex-col items-center h-full">
      <LeftTitles title="goalPage.title" description="goalPage.subTitle" />

      <form className="mt-8 w-92 md:w-96">
        <RadioButtonGroup label="" options={radioList} onChange={radioGroupHandler} randerOnCondition={getCarInputs} conditionValue={ELoanReason.CAR} isCondition={reason === ELoanReason.CAR} className="w-full" divConditionClassName='mb-4'/>
      </form>
      <div className="mt-12 lg:pb-20 lg:mt-auto">
        <Button onClick={saveGoalHandler} disabled={!reason || reason === ELoanReason.CAR && (!input.carBrand || !isValidCarYear || !isValidCarValue)}> {t('goalPage.action')}</Button>
      </div>
      
    </div>
  )
}
