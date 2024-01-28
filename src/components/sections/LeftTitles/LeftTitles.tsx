import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export interface ILeftTitlesProps {
  title:string
  description?:string
  showLoanAmount?:boolean
  className?: string
}

export const LeftTitles = (props: ILeftTitlesProps) => {
  const { t } = useTranslation()
  const { showLoanAmount = false } = props
  useEffect(() => {

  }, [])

const renderLoanAmount = () => {
  if (showLoanAmount) {
    return (
      <div className="w-6/12 text-white bg-sky rounded-xl text-3xl font-extrabold text-center p-4 mb-2"> 250,000 </div> 
    )
  }
  return null
}

// ${props.img}
  return (
    <div className={`${props.className} ${showLoanAmount ? '' : 'p-10'}  flex flex-col items-center`}>
      {renderLoanAmount()}
      <div className="text-black bold text-4xl text-center"> {t(props.title)}</div>
      <div className="text-black text-xl text-center mt-3"> {t(props?.description || '')}</div> 
      
    </div>
  )
}
