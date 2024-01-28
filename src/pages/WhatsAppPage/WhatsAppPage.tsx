import { useEffect, ChangeEvent } from 'react'

import {Button, Input, RadioButtonGroup} from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { ELoanReason } from '@/core/api/types'
import { LeftTitles } from '@/components/sections/LeftTitles'
import { useAuth } from '@/core/context'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'


export const WhatsAppPage = ( ) => {
  const { t } = useTranslation()
  useEffect(() => {
    
  }, [])



  return (

    <div>
      <LeftTitles title="whatsappPage.title" description="whatsappPage.subTitle" showLoanAmount={true} />
      <div className="p-4 text-justify form text-sky">{t('whatsappPage.desc')}</div>
      
      <WhatsAppButton />

    </div>    

      
  )
}
