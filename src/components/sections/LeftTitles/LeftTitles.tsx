import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export interface ILeftTitlesProps {
  title: string
  description?: string
  className?: string
  titleParam?: object
  subTitleParam?: object
  onClickBack?: () => void
  backString?: string
}

export const LeftTitles = (props: ILeftTitlesProps) => {
  const { t } = useTranslation()
  useEffect(() => {

  }, [])


  return (
    <div className={`${props.className}  md:pb-10 md:pt-8 flex flex-col items-center`}>
      <div className="text-3xl text-center text-black md:text-4xl bold"> {props.titleParam ? t(props.title, props.titleParam as { key: string }) : t(props.title)}</div>
      <div className="mt-3 text-lg text-center text-black md:text-xl"> {props.description ? t(props.description, props.subTitleParam as { key: string }) : t(props.description || '')}</div>
    </div>
  )
}
