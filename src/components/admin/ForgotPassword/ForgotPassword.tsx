import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Stepper } from '@/components/smart'
import { ForgotPasswordForm } from './Form'

import './style.scss'

enum EStep {
  forgot = 'forgot',
  reset = 'reset',
}

const stepData = [
  { index: 1, value: EStep.forgot },
  { index: 2, value: EStep.reset },
]

interface IForgotPasswordProps {
  _identifier: string
}

export const ForgotPassword = ({ _identifier }: IForgotPasswordProps) => {
  const { t } = useTranslation()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [identifier, setIdentifier] = useState<string>('')

  const onSubmitForgotPasswordHandler = useCallback(
    ({ step, identifier }: { step: number; identifier: string }) => {
      setIdentifier(identifier)
      setCurrentStep(step)
    },
    [identifier, currentStep],
  )

  useEffect(() => {
    setIdentifier(_identifier)
  }, [])

  return (
    <div className="forgot-password">
      <Stepper
        className="forgot-password__stepper"
        currentStep={currentStep}
        data={stepData}
      />

      <div className="forgot-password__title">
        {t('admin.forgotPassword.title__context', {
          context: stepData.find((item) => item.index === currentStep)?.value,
        })}
      </div>
      <div className="forgot-password__description">
        {t('admin.forgotPassword.description__context', {
          context: stepData.find((item) => item.index === currentStep)?.value,
        })}
      </div>

      {currentStep === 1 && (
        <ForgotPasswordForm onSubmit={onSubmitForgotPasswordHandler} />
      )}
      {currentStep === 2 && <>2</>}
    </div>
  )
}
