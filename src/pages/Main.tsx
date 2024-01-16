import { useCallback, useRef, useEffect, useState, ReactNode } from 'react'


import {
  Ai,
  BusinessSupport,
  Footer,
  Header,
  Help,
  HowItWorks,
  Security,
} from '@/components/sections'

import {OnBoarding} from '@/components/sections/OnBoarding/OnBoarding'
import { WelcomePage } from './WelcomePage'
import { GoalPage } from './GoalPage'
import { LoginPage } from './LoginPage'

export const MainPage = () => {
  const aiRef = useRef(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    
  }, [])

  // const scrollToAI = useCallback(() => {
  //   if (aiRef.current) {
  //     setTimeout(() => {
  //       window.scrollTo({
  //         top: (aiRef.current as unknown as HTMLDivElement).offsetTop + 70,
  //         behavior: 'smooth',
  //       })
  //     }, 200)
  //   }
  // }, [aiRef])

  const showPage = () : ReactNode => {
    switch (step) {
      case 0:
        return <WelcomePage onClickNext={() => setStep(1)}/>
      case 1:
        return <GoalPage onClickNext={() => setStep(2)}/>
      case 2:
        return <LoginPage onClickNext={() => setStep(0)}/>
      // case 3:
      //   return <Help />
      // case 4:
      //   return <Security />
      // case 5:
      //   return <BusinessSupport />
      // default:
      //   return <OnBoarding />
    }
  }

  return (
    <>
      
      <Header />
      {showPage()}
      {/* <div ref={aiRef}>
        <Ai />
      </div> */}
      <Footer />
    </>
  )
}
