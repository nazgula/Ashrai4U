import { useCallback, useRef, useEffect } from 'react'
import './style.scss'

import {Button, Input} from '@/components/ui'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoginByPhone } from '@/components/LoginByPhone'


export const OnBoarding = () => {
  const aiRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    
  }, [])

  const scrollToAI = useCallback(() => {
    if (aiRef.current) {
      setTimeout(() => {
        window.scrollTo({
          top: (aiRef.current as unknown as HTMLDivElement).offsetTop + 70,
          behavior: 'smooth',
        })
      }, 200)
    }
  }, [aiRef])



  return (

      <div className="side-by-side">
        <div className="right">
            <p>This is the right div.</p>
        </div>
          <div className="left">
{/*             
            <Input type="number" value="test" placeholder='הכנס מספר נייד' />
            <Button> שלח קוד</Button> */}
            <LoginByPhone />
          </div>
        
      </div>

  )
}
