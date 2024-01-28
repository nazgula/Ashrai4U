import { useCallback, useRef, useEffect, ChangeEvent, useState } from 'react'
// import './style.scss'

import {Button, Input, RadioButtonGroup} from '@/components/ui'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoginByPhone } from '@/components/LoginByPhone'
import { RightSideContainer } from '@/components/sections/RightSideContainer'
import { ELoanReason } from '@/core/api/types'
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

  return (
 
      <div className='flex h-[90vh] w-full'>
        <RightSideContainer img='goal-page-right-img' step={props.step} className="w-4/12"/>
        <div className="w-8/12 overflow-y-auto bg-white p-10">
          {props.children}  
        </div>
      </div>
  )
}
