import { useCallback, useRef, useEffect, ChangeEvent, useState } from 'react'
import './style.scss'

import {Button, Input, RadioButtonGroup} from '@/components/ui'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoginByPhone } from '@/components/LoginByPhone'
import { RightSideContainer } from '@/components/sections/RightSideContainer'
import { EEmplymentType } from '@/core/api/types'
import classNames from 'classnames'
import { LeftTitles } from '@/components/sections/LeftTitles'
import { updateLoanRequestApiCall } from '@/core/api/calls'
import { useAuth } from '@/core/context'


export interface IEmploymentTypePageProps{
  onClickNext: () => void
}

export const EmploymentTypePage = (props:IEmploymentTypePageProps ) => {
  const { onClickNext } = props
  const [employmentType, setEmploymentType] = useState('' as EEmplymentType)
  const aiRef = useRef(null)
  const { t } = useTranslation()
  const { user } = useAuth()
  useEffect(() => {
    
  }, [])

  const saveGoalHandler = async () => {
    console.log('employmentType:', employmentType)
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
  }

  const radioList = [
    {
      value: EEmplymentType.CONTRACT,
      name: 'button-types',
      label: t('employmentTypePage.type.contract'),
    },
    {
      value: EEmplymentType.FREELANCER,
      name: 'button-types',
      label: t('employmentTypePage.type.freelancer'),
    },
  ]

   const radioGroupHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setEmploymentType(event.target.value as EEmplymentType)
    }


  return (

    <div>
      <LeftTitles title="employmentTypePage.title" description="employmentTypePage.subTitle" showLoanAmount={true}/>

      <form className="form">
          <RadioButtonGroup label="" options={radioList} onChange={radioGroupHandler} className="flex-row"/> 
          
          <div className="form-button-group">
            <Button onClick={saveGoalHandler} disabled={!employmentType ? true : false}> {t('goalPage.action')}</Button>
          </div>
      </form>

    </div>    

      
  )
}