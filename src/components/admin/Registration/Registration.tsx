/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TSignUpApiCallPayload } from '@/core/api/types'

import { Stepper } from '@/components/smart'
import { RegistrationForm } from '@/components/admin/Registration/Form'
import { Verification } from '@/components/admin/Registration/Verification'
import { RegistrationProfile } from '@/components/admin/Registration/Profile'

import './style.scss'

enum EStep {
  signUp = 'signUp',
  verify = 'verify',
  profile = 'profile',
}

const stepData = [
  { index: 1, value: EStep.signUp },
  { index: 2, value: EStep.verify },
  { index: 3, value: EStep.profile },
]
export const Registration = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation()

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [regData, setRegData] = useState<TSignUpApiCallPayload>()

  const onSubmitRegistrationHandler = useCallback(
    ({ step, regData }: { step: number; regData: TSignUpApiCallPayload }) => {
      setRegData(regData)
      setCurrentStep(step)
    },
    [regData, currentStep],
  )

  const onSubmitVerificationHandler = useCallback(
    ({ step }: { step: number }) => {
      setCurrentStep(step)
    },
    [currentStep],
  )

  return (
    <div className="registration">
      <Stepper
        className="registration__stepper"
        currentStep={currentStep}
        data={stepData}
      />

      <div className="registration__title">
        {t('admin.registration.title__context', {
          context: stepData.find((item) => item.index === currentStep)?.value,
        })}
      </div>
      <div className="registration__description">
        {t('admin.registration.description__context', {
          context: stepData.find((item) => item.index === currentStep)?.value,
        })}
      </div>

      {currentStep === 1 && (
        <RegistrationForm onSubmit={onSubmitRegistrationHandler} />
      )}

      {currentStep === 2 && (
        <Verification
          onSubmit={onSubmitVerificationHandler}
          regData={regData!}
        />
      )}

      {currentStep === 3 && <RegistrationProfile />}
    </div>
  )
}
