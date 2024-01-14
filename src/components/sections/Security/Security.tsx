import { useCallback } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { Button, EButtonType, Icon } from '@/components/ui'
import './style.scss'

interface SecurityProps {
  onClick: () => void
}

export const Security = ({ onClick }: SecurityProps) => {
  const { t } = useTranslation()
  const scrollToAiHandler = useCallback(() => {
    onClick && onClick()
  }, [onClick])

  // helpCustom
  return (
    <section className="security">
      <div className="container">
        <Icon viewBox="0 0 380 373" icon={'securityCustom'} />

        <div className="security__content">
          <div className="security__title">
            <Trans
              components={{
                br: <br />,
                span: <span />,
              }}
            >
              {t('main.security.title')}
            </Trans>
          </div>

          <Icon viewBox="0 0 380 373" icon={'securityCustom'} />

          <Button type={EButtonType.button} onClick={scrollToAiHandler}>
            {t('main.security.btn')}
          </Button>
        </div>
      </div>
    </section>
  )
}
