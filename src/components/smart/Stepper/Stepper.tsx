/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

import './style.scss'

interface IStepperProps {
  currentStep: number
  className?: string
  data: { index: number; value: string | any }[]
}

export const Stepper = ({
  currentStep = 1,
  className,
  data,
}: IStepperProps) => {
  const [, setStep] = useState<number>(currentStep)

  useEffect(() => {
    setStep(currentStep)
  }, [currentStep])

  return (
    <div className={`stepper ${className ? className : ''}`}>
      <ul className="stepper-list stepper__list">
        {Array.from({ length: data.length }, (_, i) => i + 1).map(
          (step, index) => {
            return (
              <li
                className={`stepper-list__item ${
                  step <= currentStep ? 'active' : ''
                }`}
                key={index}
              ></li>
            )
          },
        )}
      </ul>
    </div>
  )
}
