/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ChangeEvent } from 'react'
import { parsePhoneNumberWithError, ParseError } from 'libphonenumber-js'
import { t } from 'i18next'

import { signUpApiCall } from '@/core/api/calls'
import { TSignUpApiCallPayload } from '@/core/api/types'
import { Icon, Input, Button, EButtonType, Checkbox } from '@/components/ui'
import { PDF } from '@/components/smart'

interface IPasswordCheck {
  text: string
  isValid: boolean
}

interface IRegistrationFormProps {
  onSubmit: ({
    step,
    regData,
  }: {
    step: number
    regData: TSignUpApiCallPayload
  }) => void
}

export const RegistrationForm = ({ onSubmit }: IRegistrationFormProps) => {

  const [input, setInput] = useState({
    identifier: '',
    password: '',
    confirmPassword: '',
  })

  const [validLength, setValidLength] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [showPDF, setShowPdf] = useState(false)
  const [showPDFPolicy, setShowPdfPolicy] = useState(false)
  const [upperCase, setUpperCase] = useState(false)
  const [lowerCase, setLowerCase] = useState(false)
  const [specialChar, setSpecialChar] = useState(false)
  const [match, setMatch] = useState(false)
  const [requiredLength] = useState(8)

  const [isValidIdentifier, setIsValidIdentifier] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isChecked, setChecked] = useState(false)

  const confirmationPasswordErrorMessage = t(
    'admin.registration.error.confirmation',
  )
  const identifierErrorMessage = t('admin.registration.error.identifier')

  const checkPasswordList: IPasswordCheck[] = [
    {
      text: t('admin.login.checkList__context', {
        context: 'validLength',
        amountCharacters: requiredLength,
      }),
      isValid: validLength,
    },
    {
      text: t('admin.login.checkList__context', { context: 'lowerCase' }),
      isValid: lowerCase,
    },
    {
      text: t('admin.login.checkList__context', { context: 'upperCase' }),
      isValid: upperCase,
    },
    {
      text: t('admin.login.checkList__context', { context: 'hasNumber' }),
      isValid: hasNumber,
    },
    {
      text: t('admin.login.checkList__context', { context: 'specialChar' }),
      isValid: specialChar,
    },
  ]
  // const emailRegex = new RegExp(
  //   /^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
  //   'gm',
  // )

  useEffect(() => {
    setValidLength(input.password.length >= requiredLength ? true : false)
    setUpperCase(input.password.toLowerCase() !== input.password)
    setLowerCase(input.password.toUpperCase() !== input.password)
    setHasNumber(/\d/.test(input.password))
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(input.password))
    setMatch(!!input.password && input.password === input.confirmPassword)
  }, [input, requiredLength])

  useEffect(() => {
    const isPhoneNumberValid = isNumberValid(input.identifier)
    // const isValidEmail = emailRegex.test(input.identifier)

    if (input.identifier.length === 0) {
      setIsValidIdentifier(true)
    } else if (
      (isPhoneNumberValid ) &&
      input.identifier.length > 0
    ) {
      setIsValidIdentifier(true)
    } else {
      setIsValidIdentifier(false)
    }
  }, [input.identifier])

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const createAccountHandler = async (payload: TSignUpApiCallPayload) => {
    try {
      await signUpApiCall(payload)
      onSubmit({ step: 2, regData: payload })
    } catch (error: any) {
      console.log(error.message)
    }
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
  return (
    <form className="registration-form">
       {showPDF && <div className="registration-form__wrapper">
      
      <PDF url={'/terms.pdf'} />
      <Button
        type={EButtonType.button}
       
        onClick={() =>setShowPdf(false)}>
        {t('admin.registration.close')}
      </Button>
      </div>
      }
      {showPDFPolicy && <div className="registration-form__wrapper">
      
      <PDF url={'/privacy-policy.pdf'} />
      <Button
        type={EButtonType.button}
       
        onClick={() =>setShowPdfPolicy(false)}>
        {t('admin.registration.close')}
      </Button>
      </div>
      }

     {!showPDF &&!showPDFPolicy &&  <div className="registration-form__wrapper">

        <div className="registration-form__decorate">
          <Icon viewBox="0 0 41 48" size={'41px'} icon="secure" />
          <p>{t('admin.registration.decorate')}</p>
        </div>
        <fieldset>
          <Input
            type="text"
            name="identifier"
            placeholder={t('admin.registration.input.identifier-placeholder')}
            error={!isValidIdentifier ? identifierErrorMessage : ''}
            value={input.identifier}
            onInput={onInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder={t('admin.registration.input.password-placeholder')}
            value={input.password}
            error={
              input.password.length > 0
                ? checkPasswordList.find((item) => !item.isValid)?.text
                : ''
            }
            onInput={onInputChange}
          />
          <Checkbox
            name="license"
            isChecked={isChecked}
            label={
              <>
                {t('admin.registration.checkbox.text')}{' '}
                <a href="#" onClick={() => { setShowPdf(true)}} >
                  {t('admin.registration.checkbox.link1')}
                </a>
                ,
                <a href="#" onClick={() => { setShowPdfPolicy(true)}} >
                  {t('admin.registration.checkbox.link2')}
                </a>
              </>
            }
            setIsChecked={(value) => setChecked(value)}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder={t(
              'admin.registration.input.confirmPassword-placeholder',
            )}
            error={
              input.password.length > 0 &&
              input.confirmPassword.length > 0 &&
              !match
                ? confirmationPasswordErrorMessage
                : ''
            }
            value={input.confirmPassword}
            onInput={onInputChange}
          />
        </fieldset>
      </div>}

      <Button
        type={EButtonType.button}
        disabled={
          input.identifier.length === 0 ||
          input.password.length === 0 ||
          !isValidIdentifier ||
          !isChecked ||
          Boolean(checkPasswordList.find((item) => !item.isValid)?.text)
        }
        onClick={() =>
          createAccountHandler({
            username: input.identifier,
            password: input.password,
          })
        }
      >
        {t('admin.registration.submit')}
      </Button>
    </form>
  )
}
