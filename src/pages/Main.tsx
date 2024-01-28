import { useCallback, useRef, useEffect, useState, ReactNode } from 'react'
import { Footer, Header } from '@/components/sections'
import { WelcomePage } from './WelcomePage'
import { GoalPage } from './GoalPage'
import { LoginPage } from './LoginPage'
import { InnerPage } from './InnerPage'
import { LoanResuestPage } from './LoanRequest'
import { EmploymentTypePage } from './EmploymentTypePage'
import { IncomePage } from './IncomePage'
import { MaritalStatusPage } from './MaritalStatusPage'
import { WhatsAppPage } from './WhatsAppPage'
import { useAuth } from '@/core/context'

export enum ESteps {
  WELCOME = 'WELCOME',
  LOGIN = 'LOGIN',
  GOAL = 'GOAL',
  LOAN = 'LOAN',
  EMPLOYMENT = 'EMPLOYMENT',
  MERITAL_STATUS = 'MERITAL_STATUS',
  INCOME = 'INCOME',
  WHATSAPP = 'WHATSAPP'
}

export const MainPage = () => {
  const { user } = useAuth()
  const [step, setStep] = useState(user && user.username ? ESteps.LOGIN: ESteps.WELCOME)

  useEffect(() => {
    
  }, [])

  

  const showPage = () : ReactNode => {
    if (step == ESteps.WELCOME ) {
        return <WelcomePage onClickNext={() => setStep(ESteps.LOGIN)}/>
    } 
    else {
      return ( 
        <InnerPage step={step}>
          {showInnerPage()}
        </InnerPage>
      )
    } 
  }

  const showInnerPage = () : ReactNode => {
    if (step == ESteps.LOGIN) {
      return <LoginPage onClickNext={() => setStep(ESteps.GOAL)}/>
    }
    else if (step == ESteps.GOAL) {
      return <GoalPage onClickNext={() => setStep(ESteps.LOAN)}/>
    }
    else if (step == ESteps.LOAN) {
      return <LoanResuestPage onClickNext={() => setStep(ESteps.EMPLOYMENT)}/>
    }
    else if (step == ESteps.EMPLOYMENT) {
      return <EmploymentTypePage onClickNext={() => setStep(ESteps.MERITAL_STATUS)}/>
    }
    else if (step == ESteps.MERITAL_STATUS) {
      return <MaritalStatusPage onClickNext={() => setStep(ESteps.INCOME)}/>
    }
    else if (step == ESteps.INCOME) {
      return <IncomePage onClickNext={() => setStep(ESteps.WHATSAPP)}/>
    }
    else if (step == ESteps.WHATSAPP) {
      return <WhatsAppPage />
    }
  }

  return (
    <> 
      <Header/>
      {showPage()}
      <Footer />
    </>
  )
}
