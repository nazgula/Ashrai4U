import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export interface ILeftTitlesProps {
  title:string
  description?:string
  showLoanAmount?:boolean
  className?: string
  titleParam?: object
  subTitleParam?: object
}

export const LeftTitles = (props: ILeftTitlesProps) => {
  const { t } = useTranslation()
  const { showLoanAmount = false } = props
  useEffect(() => {

  }, [])

const renderLoanAmount = () => {
  if (showLoanAmount) {
    return (
      <div className="w-6/12 p-4 mb-2 text-3xl font-extrabold text-center text-white bg-sky rounded-xl"> 250,000 </div> 
    )
  }
  return null
}

// ${props.img}
  return (
    <div className={`${props.className}  md:py-10  flex flex-col items-center`}>
      <div className="text-3xl text-center text-black md:text-4xl bold"> {props.titleParam ? t(props.title, props.titleParam as {key : string}) : t(props.title)}</div>
      <div className="mt-3 text-lg text-center text-black md:text-xl"> {props.description ? t(props.description, props.subTitleParam as {key : string}) : t(props.description || '') }</div> 
      
    </div>
  )
}
