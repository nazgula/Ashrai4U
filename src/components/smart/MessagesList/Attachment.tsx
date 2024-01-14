/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EButtonType } from '@/components/ui'
import { SyntheticEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IAttachmentProps {
  attachment: {
    name: string
    isMultiple?: boolean
    data: { value: string; label: string }[]
  }
  onClick?: (payload: { [key: string]: string | string[] }) => void
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export const Attachment = ({ attachment, onClick }: IAttachmentProps) => {
  const { t } = useTranslation()
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const [curKey, setKey] = useState<string>('')
  const [data, setData] = useState<string[]>([])
  const isMultiple = Object.prototype.hasOwnProperty.call(
    attachment,
    'isMultiple',
  )

  const clickHandler = useCallback(
    (event: SyntheticEvent<HTMLButtonElement>, value: string) => {
      const { target }: any = event
      target.closest('button').classList.add('checked')
      if (!curKey) {
        setKey(attachment.name)
      }

      if (!attachment.isMultiple) {
        setDisabled(true)
        setData([value])
        onClick && onClick({ [attachment.name]: [value].join(',') })
      } else {
        setData((prev) => [...prev, value])
      }
    },
    [onClick],
  )

  const finishClickHandler = useCallback(
    (event: SyntheticEvent<HTMLButtonElement>) => {
      const { target }: any = event
      target.setAttribute('disabled', true)
      setDisabled(true)
      onClick && onClick({ [attachment.name]: data.join(',') })
    },
    [onClick, data],
  )

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  return (
    <div className="message__attachment">
      {attachment.data.map((item) => {
        return (
          <button
            type={EButtonType.button}
            key={item.value}
            disabled={isDisabled}
            onClick={(event) => clickHandler(event, item.value)}
          >
            {item.label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <rect width="17" height="17" rx="5" fill="white" />
              <path
                d="M11.4748 5.24601L6.71106 9.88463L5.54736 8.75149C5.46434 8.66778 5.36503 8.60102 5.25522 8.55509C5.14542 8.50916 5.02732 8.48498 4.90782 8.48397C4.78832 8.48296 4.66981 8.50514 4.5592 8.5492C4.44859 8.59327 4.34811 8.65834 4.2636 8.74062C4.1791 8.82291 4.11227 8.92076 4.06702 9.02846C4.02177 9.13616 3.999 9.25156 4.00003 9.36792C4.00107 9.48429 4.0259 9.59929 4.07307 9.70621C4.12024 9.81313 4.1888 9.90983 4.27476 9.99067L6.07476 11.7434C6.24353 11.9077 6.47241 12 6.71106 12C6.94971 12 7.17858 11.9077 7.34736 11.7434L12.7474 6.48519C12.9113 6.31991 13.002 6.09854 13 5.86875C12.9979 5.63897 12.9033 5.41917 12.7364 5.25668C12.5695 5.0942 12.3438 5.00203 12.1078 5.00003C11.8718 4.99804 11.6445 5.08637 11.4748 5.24601Z"
                fill="#33AAEE"
              />
            </svg>
          </button>
        )
      })}
      {isMultiple && (
        <div className="message__attachment-done">
          <button disabled={!data.length} onClick={finishClickHandler}>
            {t('main.ai.chat.btn-confirm')}
          </button>
        </div>
      )}
    </div>
  )
}
