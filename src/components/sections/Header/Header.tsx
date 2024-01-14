/* eslint-disable @typescript-eslint/no-unused-vars */
import { SyntheticEvent, useState } from 'react'
import { EDirection, ELangSupport } from '@/i18n'
import { useTranslation } from 'react-i18next'

import { useAuth, useModal } from '@/core/context'
import { TDeleteApiCallPayload } from '@/core/api/types'
import { deleteUserApiCall } from '@/core/api/calls'

import { Login, Registration } from '@/components/admin'
import { Brand } from '@/components/smart'

import {
  Button,
  Dropdown,
  EButtonType,
  IDropdownData,
  Icon,
} from '@/components/ui'

import './style.scss'

type ILocales = {
  [x in ELangSupport]: { title: ELangSupport }
}
const locales: ILocales = {
  en: { title: ELangSupport.en },
  he: { title: ELangSupport.he },
}

export const Header = () => {
  const { user } = useAuth()
  const { setModal } = useModal()
  const { t, i18n } = useTranslation()
  const [isLocalesListOpen, setLocalesListStatus] = useState(false)

  const openLoginModalHandler = () => {
    if (user) return
    setModal(<Login />)
  }

  const openRegisterModalHandler = () => {
    if (user) return
    setModal(<Registration />)
  }

  const removeUserHandler = async (
    event: SyntheticEvent<HTMLButtonElement>,
    payload = {
      username: accountValue.value as string,
      // username: '+380935543736',
      // password: 'roiLand#906',
      password: '4c2bcuqV!',
    } as TDeleteApiCallPayload,
  ) => {
    event.preventDefault()
    try {
      const response = await deleteUserApiCall({ ...payload })
      console.log('removeUserHandler: ', response)
    } catch (error) {
      console.log('removeUserHandler error: ', error)
    }
  }

  const getLocalesIcon = (lang: ELangSupport) => {
    switch (lang) {
      case ELangSupport.en:
        return (
          <img
            src="https://flagsapi.com/GB/flat/24.png"
            alt={ELangSupport.en}
          />
        )
      case ELangSupport.he:
        return (
          <img
            src="https://flagsapi.com/IL/flat/24.png"
            alt={ELangSupport.he}
          />
        )
      default:
        return (
          <img
            src="https://flagsapi.com/BE/flat/24.png"
            alt={ELangSupport.en}
          />
        )
    }
  }

  const LocalesList = () => {
    return (
      <div className="langSwitcher__list">
        {Object.keys(locales).map((locale) => (
          <button
            key={locale}
            type={EButtonType.button}
            className="langSwitcher__listItem"
            disabled={locale === i18n.resolvedLanguage}
            onClick={() => {
              i18n.changeLanguage(locale).then(() => {
                setLocalesListStatus(false)
                document.body.dir =
                  i18n.resolvedLanguage === ELangSupport.he
                    ? EDirection.rtl
                    : EDirection.ltr
              })
            }}
          >
            {getLocalesIcon(
              (locales[locale as ELangSupport] as { title: ELangSupport })
                .title,
            )}
          </button>
        ))}
      </div>
    )
  }
  const accounts = [
    { key: 'belibov.nikolay@gmail.com', value: 'belibov.nikolay@gmail.com' },
    { key: 'nikolay.belibov@gmail.com', value: 'nikolay.belibov@gmail.com' },
    { key: '+380935543736', value: '+380935543736' },
  ]
  const [accountValue, setAccountValue] = useState<IDropdownData>(accounts[0])

  const dropdownClickHandler = (item: IDropdownData) => {
    setAccountValue((prev) => ({
      ...prev,
      ...item,
    }))
  }
  return (
    <>
      <header className="header">
        <div className="header__btnGroup">
          <Button
            type={EButtonType.button}
            className="button--login"
            onClick={openLoginModalHandler}
          >
            {t('main.header.btn_login')}
          </Button>
          <Brand />
          <Button
            type={EButtonType.button}
            className="button--create-account"
            onClick={openRegisterModalHandler}
          >
            {t('main.header.btn_create_account')}
          </Button>
          {/* <div
            className="langSwitcher"
            onClick={() => {
              setLocalesListStatus(true)
            }}
          >
            <div className="langSwitcher__content">
              <span>
                {getLocalesIcon(i18n.resolvedLanguage as ELangSupport)}
              </span>
              <Icon viewBox="0 0 24 24" size={'24px'} icon={'language'} />
            </div>
            {isLocalesListOpen && <LocalesList />}
          </div> */}

          {/* {process.env.NODE_ENV === 'development' ? (
            <>
              <Button type={EButtonType.button} onClick={removeUserHandler}>
                Delete user
              </Button>
              <Dropdown
                _key={'1'}
                header={accountValue.value as string}
                data={accounts}
                onClick={dropdownClickHandler}
                hasAngle
                isSelect
              />
            </>
          ) : null} */}
        </div>
      </header>
    </>
  )
}
