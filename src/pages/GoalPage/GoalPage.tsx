import { useRef, useEffect, ChangeEvent, useState, ReactNode } from 'react'
import './style.scss'

import {Button, Input, RadioButtonGroup} from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { ELoanReason } from '@/core/api/types'
import { LeftTitles } from '@/components/sections/LeftTitles'
import { updateLoanRequestApiCall } from '@/core/api/calls'
import { useAuth } from '@/core/context'


export interface IGoalPageProps{
  onClickNext: () => void
}

export const GoalPage = (props:IGoalPageProps ) => {
  const { onClickNext } = props
  const [reason, setReason] = useState('' as ELoanReason)
  const { t } = useTranslation()
  const { user } = useAuth()
  const [input, setInput] = useState({
    carBrand: '',
    carYear: '',
    carValue: ''
  })

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    
  }, [])

  const saveGoalHandler = async () => {
    // onClickNext()
    // return
    
    if (user) {
      try {
        const response =   await updateLoanRequestApiCall({reason: reason}, user)

        if (response) {
          console.log ('save goal response', response)
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
          <Input type="text" name="carBrand" placeholder={t('goalPage.carBrand')} value={input.carBrand} onInput={onInputChange} className="w-[35%]"/>
          <Input type="text" name="carYear" placeholder={t('goalPage.carYear')} value={input.carYear} onInput={onInputChange} className="w-[25%] mx-1"/>
          <Input type="text" name="carValue" placeholder={t('goalPage.carPrice')} value={input.carValue} onInput={onInputChange} className="w-[40%]"/>
        </div>
      )
    }
    else {
      return null
    }
  }
  return (

    <div>
      <LeftTitles title="goalPage.title" description="goalPage.subTitle" />

      <form className="form">
          <RadioButtonGroup label="" options={radioList} onChange={radioGroupHandler} randerOnCondition={getCarInputs} conditionValue={ELoanReason.CAR} isCondition={reason===ELoanReason.CAR} className="w-full"/> 
            <div className="form-button-group">
            <Button onClick={saveGoalHandler}> {t('goalPage.action')}</Button>
          </div>
      </form>

    </div>    

      
  )
}
