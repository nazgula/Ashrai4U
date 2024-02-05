import { useRef, useEffect } from 'react'
import './style.scss'
import { useTranslation } from 'react-i18next'
import { ESteps } from '@/pages/Main'
import { ImageTest } from '@/components/ui/Image'
export interface IRightSideContainer {
  step: ESteps
  img: string
  className?: string
  subStep?:string
}

export const RightSideContainer = (props: IRightSideContainer) => {
  const aiRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {

  }, [])

  const tSubStep = props.subStep ? `.${props.subStep}` : ''
// ${props.img}
  return (
    <div className={`${props.className} w-full lg:w-5/12 p-8 md:p-10 lg:p-20  flex flex-col items-center bg-purple `}>

      {/* <h1 className="text-4xl text-center text-white bold"> {t(`innerPageRightTitle.${props.step}${tSubStep}`)}</h1>
      <h2 className="mt-3 text-xl text-center text-white"> {t(`innerPageRightSubTitle.${props.step}${tSubStep}`)}</h2>  */}
      {/* <div className="flex flex-grow">

       alt={t(`innerPageRightTitle.${props.step}${tSubStep}`)} className="pb-20 mt-auto"
      */}

        <ImageTest />
        <h1 className="my-1 text-3xl text-center text-white md:text-4xl md:my-4 bold"> כותרת חמודה לאווירה</h1>
      {/* </div> */}
    </div>
  )
}
