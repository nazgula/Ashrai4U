import { useCallback, useRef, useEffect, ChangeEvent, useState } from 'react'
// import './style.scss'

import {Button, Input, RadioButtonGroup} from '@/components/ui'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoginByPhone } from '@/components/LoginByPhone'
import { RightSideContainer } from '@/components/sections/RightSideContainer'
import { ELoanReason, TUpdateLoanRequestPayload } from '@/core/api/types'
import classNames from 'classnames'
import { ESteps } from './Main'

export interface IInnerPageProps{
  step: ESteps
  children?: React.ReactNode
}

export const InnerPage = (props:IInnerPageProps ) => {
  const [selectedValue, setSelectedValue] = useState('' as ELoanReason)
  const aiRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    
  }, [])

  // Your main function


  return (
 
      <div className='flex flex-col w-full lg:flex-row lg:h-[90vh] text-black'>
        <RightSideContainer img='goal-page-right-img' step={props.step}/>
        <div className="w-full p-10 bg-white lg:w-7/12 lg:overflow-y-auto">
          {props.children}  
        </div>
      </div>
  )
}
