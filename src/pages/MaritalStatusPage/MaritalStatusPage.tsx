import { useCallback, useRef, useEffect, ChangeEvent, useState } from 'react'
// import './style.scss'

import {Button, RadioButtonGroup} from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { EEmplymentType, EMaritalStatus } from '@/core/api/types'
import { LeftTitles } from '@/components/sections/LeftTitles'
import { useAuth } from '@/core/context'
import { updateLoanRequestApiCall } from '@/core/api/calls'
import { BackLink } from '@/components/ui/BackLink'


export interface IMaritalStatusPageProps{
  onClickNext: () => void
  onClickBack: () => void
}

export const MaritalStatusPage = (props:IMaritalStatusPageProps ) => {
  const { onClickNext } = props
  const { user, loanRequest } = useAuth()

  const [maritalStatus, setMaritalStatus] = useState(
    loanRequest && loanRequest.maritalStatus && 
    loanRequest.maritalStatus !== 'N/A'  as EMaritalStatus 
      ? loanRequest?.maritalStatus 
      : '' as EMaritalStatus)

  const [partnerEmployment, setPartnerEmployment] = useState(
    loanRequest && loanRequest.partnerEmploymentType && 
    loanRequest.partnerEmploymentType !== 'N/A' as EEmplymentType
      ? loanRequest?.maritalStatus 
      : '' as EEmplymentType)
  const aiRef = useRef(null)
  const { t } = useTranslation()
  
  useEffect(() => {
    
  }, [])

  const saveGoalHandler = async () => {
    const palyload = { 
      maritalStatus: maritalStatus, 
      partnerEmploymentType: maritalStatus === EMaritalStatus.MARRIED ? partnerEmployment as EEmplymentType : '' as EEmplymentType
    }

    if (user) {
      try {
        const response =   await updateLoanRequestApiCall(palyload, user)

        if (response) {
          console.log ('save marital status response', response)
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

  const MSradioList = [
    {
      value: EMaritalStatus.SINGLE,
      name: 'maritalStatus',
      label: t('maritalStatusPage.type.single'),
      className: 'width-28'
    },
    {
      value: EMaritalStatus.MARRIED,
      name: 'maritalStatus',
      label: t('maritalStatusPage.type.married'),
      className: 'width-28'
    },
    {
      value: EMaritalStatus.DIVORCED,
      name: 'maritalStatus',
      label: t('maritalStatusPage.type.divorced'),
      className: 'width-28'
    },
    {
      value: EMaritalStatus.WIDOWED,
      name: 'maritalStatus',
      label: t('maritalStatusPage.type.widowed'),
      className: 'width-28'
    },
  ]

  const PETradioList = [
    {
      value: EEmplymentType.CONTRACT,
      name: 'emplymentType',
      label: t('employmentTypePage.type.contract'),
      className: 'width-28'
    },
    {
      value: EEmplymentType.FREELANCER,
      name: 'emplymentType',
      label: t('employmentTypePage.type.freelancer'),
      className: 'width-28'
    },
  ]

   const maritalStatusRGHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setMaritalStatus(event.target.value as EMaritalStatus)
    }

    const partenrEmploymentRBHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setPartnerEmployment(event.target.value as EEmplymentType)
    }

    const renderPartnerEmploymentType = () => {
      if (maritalStatus === EMaritalStatus.MARRIED) {
        return (
          <div className='mt-4'>
            <div className="mb-8 text-xl text-center md:mt-12 lg:mt-16 text-sky">{t('maritalStatusPage.partnerEmployment')}</div>
            <RadioButtonGroup label="" options={PETradioList} onChange={partenrEmploymentRBHandler} className="flex flex-row justify-center gap-2"/> 
          </div>
        )
      }
    }


  return (

    <div className="flex flex-col items-center h-full">
      <BackLink backLinkText={t('maritalStatusPage.backLink')} onClickBack={props.onClickBack}/>

      <LeftTitles title="maritalStatusPage.title" description="maritalStatusPage.subTitle" onClickBack={props.onClickBack} backString={t('maritalStatusPage.backLink')}/>

      <form className="mt-8 w-92 md:w-96 ">
          <RadioButtonGroup label="" options={MSradioList} onChange={maritalStatusRGHandler} className="flex flex-row justify-center gap-2"/> 
          {renderPartnerEmploymentType()}
      </form>
      
      <div className="mt-12 lg:pb-20 lg:mt-auto">
        <Button onClick={saveGoalHandler} disabled={maritalStatus === EMaritalStatus.MARRIED && !partnerEmployment || !maritalStatus} > {t('goalPage.action')}</Button>
      </div>
    </div>    

      
  )
}
