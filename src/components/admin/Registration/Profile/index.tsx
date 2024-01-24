import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAuth, useModal, useStore } from '@/core/context'
import { updateProfileApiCall } from '@/core/api/calls'

import { Button, EButtonType, Icon, Input } from '@/components/ui'

interface IUpdateProfilePayload {
  indetifier: string
  companyName: string
  fullName: string
}

export const RegistrationProfile = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { setModal } = useModal()
  const updateStatus = useStore(state => state.updateStatus);

  const [input, setInput] = useState<IUpdateProfilePayload>({
    indetifier: '',
    companyName: '',
    fullName: '',
  })

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const updateProfileHandler = async (payload: IUpdateProfilePayload) => {
    try {
      if(user){
        // @ts-expect-error  old interface - not in use file deprected 
        await updateProfileApiCall(payload as IUpdateProfilePayload, user)
        updateStatus('NEW')
      }
      setModal(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="registration-profile">
      <div className="registration-profile__wrapper">
        <div className="registration-form__decorate">
          <Icon viewBox="0 0 41 48" size={'41px'} icon="secure" />
          <p>{t('admin.registration.decorate')}</p>
        </div>
        <fieldset>
          <Input
            type="text"
            name="indetifier"
            placeholder={t('admin.registration.input.indetifier-placeholder')}
            value={input.indetifier}
            onInput={onInputChange}
          />
          <Input
            type="text"
            name="companyName"
            placeholder={t('admin.registration.input.companyName-placeholder')}
            value={input.companyName}
            onInput={onInputChange}
          />
          <span></span>
          <Input
            type="text"
            name="fullName"
            placeholder={t('admin.registration.input.fullName-placeholder')}
            value={input.fullName}
            onInput={onInputChange}
          />
        </fieldset>
      </div>

      <Button
        type={EButtonType.button}
        disabled={
          input.indetifier.length === 0 ||
          input.companyName.length === 0 ||
          input.fullName.length === 0
        }
        onClick={() =>
          updateProfileHandler({
            indetifier: input.indetifier,
            companyName: input.companyName,
            fullName: input.fullName,
          })
        }
      >
        {t('admin.registration.submit')}
      </Button>
    </div>
  )
}
