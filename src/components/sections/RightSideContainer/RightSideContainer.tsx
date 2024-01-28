import { useCallback, useRef, useEffect } from 'react'
import './style.scss'

import { Button, Input } from '@/components/ui'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoginByPhone } from '@/components/LoginByPhone'
import { ESteps } from '@/pages/Main'
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
    <div className={`${props.className} p-20 flex flex-col items-center bg-purple`}>

      {/* <h1 className="text-white bold text-4xl text-center"> {t(`innerPageRightTitle.${props.step}${tSubStep}`)}</h1>
      <h2 className="text-white text-xl text-center mt-3"> {t(`innerPageRightSubTitle.${props.step}${tSubStep}`)}</h2>  */}
      {/* <div className="flex-grow flex"> */}
        <img src={require('@/assets/images/g1.png')} alt={t(`innerPageRightTitle.${props.step}${tSubStep}`)} className="mt-auto pb-20" />
      {/* </div> */}
    </div>
  )
}
