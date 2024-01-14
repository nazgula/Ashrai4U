/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useStore } from 'react-pinia'
import parsePhoneNumberFromString, { ParseError } from 'libphonenumber-js'

import { EStore } from '@/core/store'
import { useAuth, useModal } from '@/core/context'
import { getProfileApiCall, loginApiCall } from '@/core/api/calls'
import { EType, TLoginApiCallPayload } from '@/core/api/types'

import { Button, EButtonType, Input } from '@/components/ui'

import './style.scss'

interface IPasswordCheck {
  text: string
  isValid: boolean
}

export const Login = () => {
  const useProfileStore = useStore(EStore.profile)
  const { login } = useAuth()
  const { setModal } = useModal()
  const { t } = useTranslation()
  const [input, setInput] = useState({
    identifier: '',
    password: '',
  })

  // ------ password
  const [validLength, setValidLength] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [upperCase, setUpperCase] = useState(false)
  const [lowerCase, setLowerCase] = useState(false)
  const [specialChar, setSpecialChar] = useState(false)
  const [requiredLength] = useState(8)
  // ------ identifier
  const [isValidIdentifier, setIsValidIdentifier] = useState(false)

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
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    'gm',
  )
  const identifierErrorMessage = t('admin.login.identifierErrorMessage')

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

  useEffect(() => {
    setValidLength(input.password.length >= requiredLength ? true : false)
    setUpperCase(input.password.toLowerCase() !== input.password)
    setLowerCase(input.password.toUpperCase() !== input.password)
    setHasNumber(/\d/.test(input.password))
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(input.password))
  }, [input.password, requiredLength])

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const isNumberValid = (number: string) => {
    try {
      const phoneNumberObject = parsePhoneNumberFromString(number, 'IL')
      return phoneNumberObject && phoneNumberObject.isValid()
    } catch (error) {
      if (error instanceof ParseError) {
        return false
      } else {
        return false
      }
    }
  }

  const loginHandler = async (payload: TLoginApiCallPayload) => {
    try {
      const response = await loginApiCall(payload)

      
      if (response) {
        login({ ...response, UserName: payload.username })
        setModal(null)

        const profileData = await getProfileApiCall({
          ...response,
          UserName: payload.username,
        })
        useProfileStore.updateProfile({ ...profileData, type: EType.COMPANY })
  
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login">
      <div className="login__title">{t('admin.login.title')}</div>
      <div className="login__description">{t('admin.login.description')}</div>

      <form className="login-form">
        <fieldset>
          <Input
            type="text"
            name="identifier"
            placeholder={t('admin.login.input.identifier-placeholder')}
            value={input.identifier}
            error={!isValidIdentifier ? identifierErrorMessage : ''}
            onInput={onInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder={t('admin.login.input.password-placeholder')}
            value={input.password}
            error={
              input.password.length > 0
                ? checkPasswordList.find((item) => !item.isValid)?.text
                : ''
            }
            onInput={onInputChange}
          />
        </fieldset>

        <Button isLinkView>{t('admin.login.btnLink')}</Button>

        <div className="login-form__btn-group">
          <Button
            type={EButtonType.button}
            disabled={
              input.identifier.length === 0 ||
              input.password.length === 0 ||
              !isValidIdentifier ||
              Boolean(checkPasswordList.find((item) => !item.isValid)?.text)
            }
            onClick={() =>
              loginHandler({
                username: input.identifier,
                password: input.password,
              })
            }
          >
            {t('admin.login.btnGroup')}
          </Button>
        </div>
      </form>
    </div>
  )
}
