import { useCallback, useRef, useEffect, ChangeEvent, useState } from 'react'
import './style.scss'

import {Button, Input, RadioButtonGroup} from '@/components/ui'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoginByPhone } from '@/components/LoginByPhone'
import { RightSideContainer } from '@/components/sections/RightSideContainer'
import { ELoanReason } from '@/core/api/types'
import classNames from 'classnames'


export interface IWelcomePageProps{
  onClickNext: () => void
}

export const GoalPage = (props:IWelcomePageProps ) => {
  const { onClickNext } = props
  const [selectedValue, setSelectedValue] = useState('' as ELoanReason)
  const aiRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    
  }, [])

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
      <div className='side-by-side'>
        <RightSideContainer img='goal-page-right-img'/>
        <div className="left goal-page">
          <div className="goal-page__title">{t('goalPage.title')}</div>
          {/* <div className="goal-page__description">{t('admin.login.description')}</div> */}
          <div  className='goal-page-form' >
            <RadioButtonGroup
                label=""
                options={radioList}
                onChange={radioGroupHandler
              }
              /> 

            <Button onClick={onClickNext}> {t('goalPage.action')}</Button>
            </div>
            
        </div>
      </div>
  )
}
