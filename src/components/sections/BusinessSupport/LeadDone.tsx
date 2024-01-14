import { useTranslation } from 'react-i18next'

import { useModal } from '@/core/context'

import { Button, EButtonType } from '@/components/ui'

import './style.scss'

export const LeadDone = () => {
  const { t } = useTranslation()
  const { setModal } = useModal()

  return (
    <div className="lead-done">
      <h3 className="lead-done__title">
        {t('main.businessSupport.leadEnd.title')}
      </h3>
      <div className="lead-done__desc">
        {t('main.businessSupport.leadEnd.description')}
      </div>

      <div className="lead-done__message">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 47" fill="none">
          <path
            d="M23.5 0C18.8521 0 14.3087 1.37825 10.4441 3.96046C6.57955 6.54268 3.5675 10.2129 1.78884 14.5069C0.0101822 18.801 -0.455196 23.5261 0.451556 28.0846C1.35831 32.6432 3.59647 36.8305 6.883 40.117C10.1695 43.4035 14.3568 45.6417 18.9154 46.5484C23.4739 47.4552 28.199 46.9898 32.4931 45.2112C36.7871 43.4325 40.4573 40.4204 43.0395 36.5559C45.6217 32.6913 47 28.1479 47 23.5C47 20.4139 46.3922 17.3581 45.2112 14.5069C44.0302 11.6558 42.2992 9.06517 40.117 6.88299C37.9348 4.70081 35.3442 2.96982 32.4931 1.78883C29.6419 0.607845 26.5861 0 23.5 0ZM34.5685 18.1185L22.8185 29.8685C22.6 30.0888 22.3401 30.2636 22.0538 30.3829C21.7674 30.5022 21.4602 30.5636 21.15 30.5636C20.8398 30.5636 20.5326 30.5022 20.2463 30.3829C19.9599 30.2636 19.7 30.0888 19.4815 29.8685L14.7815 25.1685C14.339 24.726 14.0904 24.1258 14.0904 23.5C14.0904 22.8742 14.339 22.274 14.7815 21.8315C15.224 21.389 15.8242 21.1404 16.45 21.1404C17.0758 21.1404 17.676 21.389 18.1185 21.8315L21.15 24.8865L31.2315 14.7815C31.674 14.339 32.2742 14.0904 32.9 14.0904C33.5258 14.0904 34.126 14.339 34.5685 14.7815C35.011 15.224 35.2596 15.8242 35.2596 16.45C35.2596 17.0758 35.011 17.676 34.5685 18.1185Z"
            fill="#33AAEE"
          />
        </svg>
        <div>{t('main.businessSupport.leadEnd.message')}</div>
      </div>

      <Button type={EButtonType.button} onClick={() => setModal(null)}>
        {t('main.businessSupport.leadEnd.btn')}
      </Button>
    </div>
  )
}
