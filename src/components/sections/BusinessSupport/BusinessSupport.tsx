/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import parsePhoneNumberFromString, { ParseError } from 'libphonenumber-js'

import { useModal } from '@/core/context'
import { addLeadApiCall } from '@/core/api/calls'

import { Button, EButtonType, Icon } from '@/components/ui'
import { LeadDone } from './LeadDone'

import './style.scss'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface BusinessSupportProps {}

interface IFormState {
  companyName: string
  contactFullName: string
  phone: string
  email: string
  proposition: string
  [index: string]: string
}

interface IFormErrorState {
  companyName: boolean
  contactFullName: boolean
  phone: boolean
  email: boolean
  proposition: boolean
  [index: string]: boolean
}

export const BusinessSupport = () => {
  const { t } = useTranslation()
  const { setModal } = useModal()

  const [input, setInput] = useState<IFormState>({
    companyName: '',
    contactFullName: '',
    phone: '',
    email: '',
    proposition: '',
  })

  const [error, setError] = useState<IFormErrorState>({
    companyName: false,
    contactFullName: false,
    phone: false,
    email: false,
    proposition: false,
  })

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitFormHandler = async (event: SyntheticEvent) => {
    event.preventDefault()
    console.log(event)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isValid = validation()
    console.log('isValid: ', isValid)
    if (!isValid) return

    try {
      await addLeadApiCall({
        companyName: input.companyName,
        contactFullName: input.contactFullName,
        phone: input.phone,
        email: input.email,
        proposition: input.proposition,
      })

      setModal(<LeadDone />)

      setInput((prev) => ({
        ...prev,
        companyName: '',
        contactFullName: '',
        phone: '',
        email: '',
        proposition: '',
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    'gm',
  )
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
  const isPhoneNumberValid = isNumberValid(input.phone)
  const isValidEmail = emailRegex.test(input.email)

  const validation = () => {
    setError((prev) => ({
      ...prev,
      companyName: input.companyName.length === 0 ? true : false,
      contactFullName: input.contactFullName.length === 0 ? true : false,
      email: input.email.length === 0 ? true : !isValidEmail,
      phone: input.phone.length === 0 ? true : !isPhoneNumberValid,
      proposition: input.proposition.length === 0 ? true : false,
    }))
    return Object.values({
      companyName: input.companyName.length === 0 ? true : false,
      contactFullName: input.contactFullName.length === 0 ? true : false,
      email: input.email.length === 0 ? true : !isValidEmail,
      phone: input.phone.length === 0 ? true : !isPhoneNumberValid,
      proposition: input.proposition.length === 0 ? true : false,
    }).every((item) => item === false)
  }

  useEffect(() => {
    setError((prev) => ({
      ...prev,
      email: input.email.length === 0 ? false : !isValidEmail,
      phone: input.phone.length === 0 ? false : !isPhoneNumberValid,
    }))
  }, [input.email, input.phone])

  return (
    <div className="business-support">
      <div className="business-support__content">
        <div className="business-support__main">
          <h3 className="business-support__title">
            {t('main.businessSupport.title')}
          </h3>
          <div className="business-support__desc">
            {t('main.businessSupport.description')}
          </div>
          <form
            className="business-support__form business-support-form"
            onSubmit={submitFormHandler}
          >
            <fieldset>
              {Object.keys(input)
                .slice(0, Object.keys(input).length - 1)
                .map((item) => (
                  <div
                    key={item}
                    className={classNames('form-input-wrapper', {
                      'has-error': error[item],
                    })}
                  >
                    <label htmlFor={item}>
                      {error[item] && <span>*</span>}
                      {t(`main.businessSupport.form.${item}`)}
                    </label>
                    <input
                      type="text"
                      name={item}
                      id={item}
                      placeholder=""
                      value={input[item]}
                      onChange={onInputChange}
                    />
                    {error[item] && (
                      <span>
                        {t(`main.businessSupport.errorMessage.${item}`)}
                      </span>
                    )}
                  </div>
                ))}
              <div className="form-input-wrapper">
                <label htmlFor="proposition">
                  {error.proposition && <span>*</span>}
                  {t('main.businessSupport.form.proposition')}
                </label>
                <textarea
                  name="proposition"
                  id="proposition"
                  placeholder=""
                  value={input.proposition}
                  onChange={onInputChange}
                />
                {error.proposition && (
                  <span>
                    {t('main.businessSupport.errorMessage.proposition')}
                  </span>
                )}
              </div>
            </fieldset>

            <Button type={EButtonType.submit}>
              {t('main.businessSupport.form.btn')}
            </Button>
          </form>
        </div>

        <div className="business-support__handshake">
          <div>
            <Icon viewBox="0 0 301 245" icon="handshake" />
            <p>{t('main.businessSupport.handshake')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
