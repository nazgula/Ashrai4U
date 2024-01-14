import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import './loader.scss'

export enum ELoaderStatus {
  preparing = 'preparing-question',
  initiatingSearch = 'initiating-search',
  searchingBank = 'searching-bank',
  searchingAuthority = 'searching-authority',
  searchingInternal = 'searching-internal',
  analyzing = 'analyzing',
}
export interface ILoaderProps {
  status: ELoaderStatus
}
export const Loader = ({ status }: ILoaderProps) => {
  const { t } = useTranslation()
  return (
    <div
      className={cn('chat-loader', {
        'chat-loader--preparing': status === ELoaderStatus.preparing,
        'chat-loader--initiating-search':
          status === ELoaderStatus.initiatingSearch,
        'chat-loader--searching-bank': status === ELoaderStatus.searchingBank,
        'chat-loader--searching-authority':
          status === ELoaderStatus.searchingAuthority,
        'chat-loader--searching-internal':
          status === ELoaderStatus.searchingInternal,
        'chat-loader--analyzing': status === ELoaderStatus.analyzing,
      })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="91"
        height="90"
        viewBox="0 0 91 90"
        fill="none"
      >
        <path
          d="M69.4681 75.1701C61.5421 81.5718 51.5585 84.6202 41.4224 83.6295C33.4203 82.8674 25.9516 79.7427 19.9309 74.6366H29.7621V68.5397H9.94727V88.3546H16.0441V79.2855C22.9794 85.1537 31.5912 88.8119 40.8889 89.6502C42.3369 89.8026 43.7087 89.8788 45.0805 89.8788C55.369 89.8788 65.2765 86.3731 73.2786 79.819C87.8349 68.0825 93.5508 48.9535 87.8349 31.1201L82.0429 32.9492C86.9204 48.4962 82.0429 65.034 69.4681 75.1701Z"
          fill="currentColor"
        />
        <path
          d="M74.7266 11.2287C58.5698 -3.02273 33.9537 -4.01347 16.73 10.0094C2.24988 21.7459 -3.46595 40.7224 2.09746 58.4796L7.88949 56.6505C3.0882 41.3321 8.04191 24.8705 20.5405 14.8106C35.5541 2.61688 56.9694 3.53142 70.916 16.03H61.0086V22.1269H80.8234V2.31204H74.7266V11.2287Z"
          fill="currentColor"
        />
      </svg>
      <div className="chat-loader__description">
        {t('main.ai.chat.loading-status__context', { context: status })}
      </div>
    </div>
  )
}
