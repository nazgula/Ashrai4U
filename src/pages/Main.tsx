import { useCallback, useRef, useEffect, useState, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
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
import { TUpdateLoanRequestPayload } from '@/core/api/types'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()


  const [step, setStep] = useState(user && user.username ? ESteps.LOGIN : ESteps.WELCOME)
  // const [step, setStep] = useState(ESteps.WHATSAPP)
  useEffect(() => {

  }, [])
  
  const showPage = (): ReactNode => {
    if (step == ESteps.WELCOME) {
      return <WelcomePage onClickNext={() => setStep(ESteps.LOGIN)} />
    }
    else {
      return (
        <InnerPage step={step}>
          {showInnerPage()}
        </InnerPage>
      )
    }
  }


  const nextStepAfterLogin = (loanRequest: TUpdateLoanRequestPayload | null) => {
    // acording to the loan request and user pages define which is the users next needed step - use step order
    if (!loanRequest || !loanRequest.reason) setStep(ESteps.GOAL)
    else if (!loanRequest.requestedLoan || loanRequest.requestedLoan === '0'|| !loanRequest.monthlyReturn || loanRequest.monthlyReturn === '0') setStep(ESteps.LOAN)
    else if (!loanRequest.employmentType) setStep(ESteps.EMPLOYMENT)
    else if (!loanRequest.maritalStatus) setStep(ESteps.MERITAL_STATUS)
    else if (!loanRequest.partnerEmploymentType && loanRequest.maritalStatus === 'MARRIED') setStep(ESteps.MERITAL_STATUS)
    else if (!loanRequest.salary || loanRequest.salary === '0') setStep(ESteps.INCOME)
    else setStep(ESteps.WHATSAPP)
  }


  const showInnerPage = (): ReactNode => {
    if (step == ESteps.LOGIN) {
      // signIn={user && user.username ? true : false}
      return <LoginPage onClickNext={nextStepAfterLogin}/>
    }
    else if (step == ESteps.GOAL) {
      return <GoalPage onClickNext={() => setStep(ESteps.LOAN)} />
    }
    else if (step == ESteps.LOAN) {
      return <LoanResuestPage onClickNext={() => setStep(ESteps.EMPLOYMENT)} onClickBack={() => setStep(ESteps.GOAL)} />
    }
    else if (step == ESteps.EMPLOYMENT) {
      return <EmploymentTypePage onClickNext={() => setStep(ESteps.MERITAL_STATUS)} onClickBack={() => setStep(ESteps.LOAN)}/>
    }
    else if (step == ESteps.MERITAL_STATUS) {
      return <MaritalStatusPage onClickNext={() => setStep(ESteps.INCOME)} onClickBack={() => setStep(ESteps.EMPLOYMENT)} />
    }
    else if (step == ESteps.INCOME) {
      return <IncomePage onClickNext={() => setStep(ESteps.WHATSAPP)} onClickBack={() => setStep(ESteps.MERITAL_STATUS)} />
    }
    else if (step == ESteps.WHATSAPP) {
      return <WhatsAppPage onClickBack={() => setStep(ESteps.INCOME)}/>
    }
  }


  return (
    <>
      <Header />
      {showPage()}
    </>
  )
}
