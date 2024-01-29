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

export const WelcomePage = (props:IWelcomePageProps) => {
  const { onClickNext } = props
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
 
      <div className="h-[90vh] w-full flex flex-col items-center">
        <div className="mt-[-100px]">
          <img src={require('@/assets/images/welcome-page-top-img.png')} alt="welcome"  />
        </div>
        <div className="flex flex-col items-center justify-center w-full p-10 bg-purple h-1/2">
          <h1 className="text-4xl text-center text-white bold"> עוד טקסט מלהיב שמישהו יכתוב ויגיד מלא דברים</h1>
          <h2 className="mt-3 text-xl text-center text-white"> אי אפשר לעמד כשלא ידוע התוכן</h2>
          <Button onClick={onClickNext}  className="mt-20 bg-yellow">מעניין אותי</Button>
        </div>
      </div>

  )
}
