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

    <div className="flex flex-col items-center h-full">
      <LeftTitles title="whatsappPage.title" description="whatsappPage.subTitle" showLoanAmount={true} />
      <div className="flex flex-col items-start">
      <div className="p-4 mt-6 text-xl text-center text-sky bg-sky bg-opacity-10 rounded-b-xl rounded-tl-xl md:max-w-xs">{t('whatsappPage.messageA')}</div>
      <div className="p-4 mt-6 text-xl text-center text-sky bg-sky bg-opacity-10 rounded-xl md:max-w-xs">{t('whatsappPage.messageB')}</div>
      <div className="self-start p-4 mt-6 text-xl text-center text-sky bg-sky bg-opacity-10 rounded-xl md:max-w-xs">{t('whatsappPage.messageC')}</div>
      </div>
      <WhatsAppButton />
    </div>    

      
  )
}
