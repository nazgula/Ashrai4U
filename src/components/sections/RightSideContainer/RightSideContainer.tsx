import { useCallback, useRef, useEffect } from 'react'
import './style.scss'

import { Button, Input } from '@/components/ui'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoginByPhone } from '@/components/LoginByPhone'

export interface IRightSideContainer {
  img: string
}

export const RightSideContainer = (props: IRightSideContainer) => {
  const { img } = props
  const aiRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {

  }, [])




  return (
    <div className="right">
      <img src={require(`@/assets/images/${props.img}.png`)} alt="שמחים שהגעת! ועכשיו רוצים להכיר אותך (:" />
    </div>
  )
}
