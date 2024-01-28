import { useRef, useEffect, ChangeEvent, useState } from 'react'
import './style.scss'

import {Button, RadioButtonGroup} from '@/components/ui'
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
  const [selectedValue, setSelectedValue] = useState('' as ELoanReason)
  const { t } = useTranslation()
  const { user } = useAuth()
  useEffect(() => {
    
  }, [])

  const saveGoalHandler = async () => {
    // onClickNext()
    // return
    
    if (user) {
      try {
        const response =   await updateLoanRequestApiCall({resone: selectedValue}, user)

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
      setSelectedValue(event.target.value as ELoanReason)
    }


  return (

    <div>
      <LeftTitles title="goalPage.title" description="goalPage.subTitle" />

      <form className="form">
          <RadioButtonGroup label="" options={radioList} onChange={radioGroupHandler}/> 
          
          <div className="form-button-group">
            <Button onClick={saveGoalHandler}> {t('goalPage.action')}</Button>
          </div>
      </form>

    </div>    

      
  )
}
