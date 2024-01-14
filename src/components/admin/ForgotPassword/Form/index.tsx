/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { parsePhoneNumberWithError, ParseError } from 'libphonenumber-js'

import { Button, EButtonType, Input } from '@/components/ui'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { forgotPasswordUserApiCall } from '@/core/api/calls'

interface IForgotPasswordFormProps {
  onSubmit: ({ step, identifier }: { step: number; identifier: string }) => void
}

export const ForgotPasswordForm = ({ onSubmit }: IForgotPasswordFormProps) => {
  const { t } = useTranslation()

  const [input, setInput] = useState({
    identifier: '',
  })
  const [isValidIdentifier, setIsValidIdentifier] = useState(false)
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    'gm',
  )

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const isNumberValid = (number: string) => {
    try {
      const phoneNumber = parsePhoneNumberWithError(number, 'IL')
      return phoneNumber.isValid()
    } catch (error) {
      if (error instanceof ParseError) {
        return false
      } else {
        return false
      }
    }
  }

  const nextStepHandler = async (identifier: string) => {
    try {
      // await forgotPasswordUserApiCall(identifier)
      onSubmit({ step: 2, identifier })
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    const isPhoneNumberValid = isNumberValid(input.identifier)
    const isValidEmail = emailRegex.test(input.identifier)

    if (input.identifier.length === 0) {
      setIsValidIdentifier(true)
    } else if (
      (isPhoneNumberValid || isValidEmail) &&
      input.identifier.length > 0
    ) {
      setIsValidIdentifier(true)
    } else {
      setIsValidIdentifier(false)
    }
  }, [input.identifier])

  return (
    <form className="forgot-password-form">
      <div className="forgot-password-form__wrapper">
        <fieldset>
          <Input
            type="text"
            name="identifier"
            placeholder={t('admin.forgotPassword.input.identifier-placeholder')}
            value={input.identifier}
            onInput={onInputChange}
          />
        </fieldset>
      </div>

      <Button
        type={EButtonType.button}
        disabled={input.identifier.length === 0 || !isValidIdentifier}
        onClick={() => nextStepHandler(input.identifier)}
      >
        {t('admin.forgotPassword.submit')}
      </Button>
    </form>
  )
}
