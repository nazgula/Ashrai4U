import { Button, EButtonType } from '@/components/ui'
import { useTranslation } from 'react-i18next'

import { useAuth, useModal } from '@/core/context'

import './style.scss'

export const LogoutPrepare = () => {
  const { t } = useTranslation()
  const { logout } = useAuth()
  const { setModal } = useModal()

  return (
    <div className="logout-prepare">
      <div className="logout-prepare__title">
        {t('admin.logoutPrepare.title')}
      </div>
      <div className="logout-prepare__desc">
        {t('admin.logoutPrepare.description')}
      </div>

      <div className="logout-prepare__btns">
        <Button
          type={EButtonType.button}
          className="button--style2"
          onClick={() => setModal(null)}
        >
          {t('admin.logoutPrepare.btn__context', { context: 'cancel' })}
        </Button>
        <Button
          type={EButtonType.button}
          onClick={() => {
            logout()
            setModal(null)
          }}
        >
          {t('admin.logoutPrepare.btn__context', { context: 'logout' })}
        </Button>
      </div>
    </div>
  )
}
