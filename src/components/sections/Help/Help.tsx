import { useCallback } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { Button, EButtonType, Icon } from '@/components/ui'

import './style.scss'

interface HelpProps {
  onClick: () => void
}

export const Help = ({ onClick }: HelpProps) => {
  const { t } = useTranslation()
  // helpCustom

  const scrollToAiHandler = useCallback(() => {
    onClick && onClick()
  }, [onClick])

  return (
    <section className="help">
      <div className="container">
        <div className="help__content">
          <div className="help__title">
            <Trans
              components={{
                br: <br />,
                span: <span />,
              }}
            >
              {t('main.help.title')}
            </Trans>
          </div>
          <Button type={EButtonType.button} onClick={scrollToAiHandler}>
            {t('main.help.btn')}
          </Button>
        </div>
        <Icon viewBox="0 0 399 415" icon={'helpCustom'} />
      </div>
    </section>
  )
}
