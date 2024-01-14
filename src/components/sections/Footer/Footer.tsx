/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Icon } from '@/components/ui'

import packageJson from '@/../package.json'
import './style.scss'
import { useModal } from '@/core/context'
import { PDF } from '@/components/smart'

export const Footer = () => {
  const { t } = useTranslation()
  const { setModal } = useModal()

  const navList = [
    {
      link: '/',
      pdf: '/terms.pdf',
    },
    {
      link: '/',
      pdf: '/privacy-policy.pdf',
    },
    {
      link: '/',
    },
  ].map((item, i) => ({
    ...item,
    name: t(`main.footer.navList.${i}.name`),
  }))

  const linkHandler = (event: any, item: any) => {
    console.log(event)
    console.log(item)
    event.preventDefault()

    if (Object.prototype.hasOwnProperty.call(item, 'pdf')) {
      setModal(<PDF url={item.pdf} />)
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__brand">
          <div className="footer__brand-slogan">powered by</div>
          <Icon
            className="footer__logo"
            viewBox="0 0 183 30"
            size={'288px'}
            icon={'logoFooter'}
          />
        </div>

        <div>
          <div className="footer__version">version {packageJson.version}</div>

          <nav>
            <ul>
              {navList.map((item, index) => (
                <li key={index}>
                  <Link to={item.link} onClick={(e) => linkHandler(e, item)}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
