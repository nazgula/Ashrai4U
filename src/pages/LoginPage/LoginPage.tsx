import { useCallback, useRef, useEffect } from 'react'
import './style.scss'

import {Button, Input} from '@/components/ui'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoginByPhone } from '@/components/LoginByPhone'
import { RightSideContainer } from '@/components/sections/RightSideContainer'


export interface IWelcomePageProps{
  onClickNext: () => void
}

export const LoginPage = (props: IWelcomePageProps) => {
  const { onClickNext } = props
  const aiRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    
  }, [])




  return (

      <div className="side-by-side">
        <RightSideContainer img='phone-page-right-img'/>
          <div className="left">
            <LoginByPhone onClickNext={onClickNext} />
          </div>
        
      </div>

  )
}
