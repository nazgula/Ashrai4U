import { Trans, useTranslation } from 'react-i18next'

import { Icon } from '@/components/ui'

import './style.scss'

export const HowItWorks = () => {
  const { t } = useTranslation()

  const stepList = [
    {
      icon: {
        name: 'howItWorks3',
        viewBox: '0 0 154 95',
        maxWidth: 154,
      },
    },
    {
      icon: {
        name: 'howItWorks2',
        viewBox: '0 0 192 119',
        maxWidth: 192,
      },
    },
    {
      icon: {
        name: 'howItWorks1',
        viewBox: '0 0 216 43',
        maxWidth: 216,
      },
    },
  ].map((item, i) => ({
    ...item,
    step: t(`main.howItWorks.stepList.${i}.step`),
    title: t(`main.howItWorks.stepList.${i}.title`),
    description: t(`main.howItWorks.stepList.${i}.description`),
  }))

  return (
    <section className="howItWorks">
      <div className="container">
        <div className="howItWorks__relative">
          <Trans
            components={{
              b: <b />,
              span: <span />,
            }}
          >
            {t('main.howItWorks.relative')}
          </Trans>
        </div>
        <h3 className="howItWorks__title">{t('main.howItWorks.title')}</h3>
        <div className="howItWorks__desc">
          {t('main.howItWorks.description')}
        </div>

        <div className="stepList">
          {stepList.map((item) => {
            console.log(item)
            return (
              <div className="stepList__item" key={item.step}>
                <div className="stepList__current">{item.step}</div>
                <div className="stepList__icon">
                  <Icon
                    viewBox={`${item.icon.viewBox}`}
                    size={`${item.icon.maxWidth}px`}
                    icon={`${item.icon.name}`}
                  />
                </div>
                <div>
                  <div className="stepList__title">{item.title}</div>
                  <div className="stepList__desc">{item.description}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
