/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOutlet } from 'react-router-dom'
import { useAuth } from '@/core/context'
import { useEffect } from 'react'
import i18n, { EDirection, ELangSupport } from '@/i18n' // eslint-disable-line 
// no-unused-vars maybe used in the future


export const MainLayout = () => {
  const { user } = useAuth()
  const outlet = useOutlet()

  useEffect(() => {
    document.body.dir = EDirection.rtl
      // i18n.resolvedLanguage === ELangSupport.he
      //   ? EDirection.rtl
      //   : EDirection.ltr
  }, [])

  if (user) {
    // console.log(user)
  }

  return <>{outlet}</>
}
