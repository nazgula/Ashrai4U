import { useCallback, useRef, useEffect, ChangeEvent, useState } from 'react'
import './style.scss'

import {Button, Input, RadioButtonGroup} from '@/components/ui'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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
    // onClickNext()
    // return
    if (user) {
      try {
        const response =   await updateLoanRequestApiCall({employmentType: employmentType}, user)

        if (response) {
          console.log ('save employmentType response', response)
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
      value: EEmplymentType.CONTRACT,
      name: 'button-types',
      label: t('employmentTypePage.type.contract'),
      divClassName: 'w-30',
    },
    {
      value: EEmplymentType.FREELANCER,
      name: 'button-types',
      label: t('employmentTypePage.type.freelancer'),
      divClassName: 'w-30',
    },
  ]

   const radioGroupHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setEmploymentType(event.target.value as EEmplymentType)
    }


  return (

    <div className="flex flex-col items-center h-full">
      <LeftTitles title="employmentTypePage.title" description="employmentTypePage.subTitle" showLoanAmount={true}/>

      <form className="mt-8 w-92 md:w-96">
          <RadioButtonGroup label="" options={radioList} onChange={radioGroupHandler} className="flex flex-row justify-center gap-2"/> 
      </form>

      <div className="mt-32 lg:pb-20 lg:mt-auto">
        <Button onClick={saveGoalHandler} disabled={!employmentType ? true : false}> {t('goalPage.action')}</Button>
      </div>

    </div>    

      
  )
}
