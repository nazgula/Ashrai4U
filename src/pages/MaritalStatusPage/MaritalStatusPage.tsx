import { useCallback, useRef, useEffect, ChangeEvent, useState } from 'react'
// import './style.scss'

import {Button, RadioButtonGroup} from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { EEmplymentType, EMaritalStatus } from '@/core/api/types'
import { LeftTitles } from '@/components/sections/LeftTitles'
import { useAuth } from '@/core/context'


export interface IMaritalStatusPageProps{
  onClickNext: () => void
}

export const MaritalStatusPage = (props:IMaritalStatusPageProps ) => {
  const { onClickNext } = props
  const [maritalStatus, setMaritalStatus] = useState('' as EMaritalStatus)
  const [partnersEmployment, setPartnersEmployment] = useState('' as EEmplymentType)
  const aiRef = useRef(null)
  const { t } = useTranslation()
  const { user } = useAuth()
  useEffect(() => {
    
  }, [])

  const saveGoalHandler = async () => {
    console.log('maritalStatus:', maritalStatus)
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
      setPartnersEmployment(event.target.value as EEmplymentType)
    }

    const renderPartnerEmploymentType = () => {
      if (maritalStatus === EMaritalStatus.MARRIED) {
        return (
          <div className='mt-4'>
            <div>{t('maritalStatusPage.partnerEmployment')}</div>
            <RadioButtonGroup label="" options={PETradioList} onChange={partenrEmploymentRBHandler} className="bg-red   flex-row gap-0 justify-between"/> 
          </div>
        )
      }
    }


  return (

    <div>
      <LeftTitles title="maritalStatusPage.title" description="maritalStatusPage.subTitle" showLoanAmount={true}/>

      <form className="w-form ">
          <RadioButtonGroup label="" options={MSradioList} onChange={maritalStatusRGHandler} className="flex-row"/> 
          {renderPartnerEmploymentType()}
          
          <div className="form-button-group">
            <Button onClick={saveGoalHandler} disabled={maritalStatus === EMaritalStatus.MARRIED && !partnersEmployment || !maritalStatus}> {t('goalPage.action')}</Button>
          </div>
      </form>

    </div>    

      
  )
}
