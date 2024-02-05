import { useEffect, ChangeEvent, useState } from 'react'
import {Button, Icon, Input, RadioButtonGroup} from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { ELoanReason } from '@/core/api/types'
import { LeftTitles } from '@/components/sections/LeftTitles'
import { useAuth } from '@/core/context'
import { formatNumber, unformatNumber } from '@/utilities/utilities'
import { updateLoanRequestApiCall } from '@/core/api/calls'
import { BackLink } from '@/components/ui/BackLink'


export interface ILoanRequestPageProps{
  onClickNext: () => void
  onClickBack: () => void
}

export const LoanResuestPage = (props:ILoanRequestPageProps ) => {
  const { onClickNext } = props
  const [loanRequest, setLoanRequest] = useState('0' as ELoanReason)
  const [loanReturn, setLoanReturn] = useState('');
  const [errorReurnAmoune, setErrorReurnAmoune] = useState('');

  const { t } = useTranslation()
  const { user } = useAuth()
  useEffect(() => {
    
  }, [])

  const updateProfileHandler = async () => {
    try {
      if (user) {
        try {
          const response =   await updateLoanRequestApiCall({monthlyReturn: loanReturn, requestedLoan: loanRequest}, user)

          if (response) {
            console.log ('save loan request response', response)
            onClickNext()
          }
        } catch (error) {
          console.log(error)
        } 
      }
      else {
        // Alert ERROR
        console.log('user not found')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    const roundedValue = Math.round(newValue / 5000) * 5000; // Round to the nearest 5000
    setLoanRequest(roundedValue.toString() as ELoanReason);
  };


  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value;
    if (!/^\d+$/.test(newInputValue)) setErrorReurnAmoune(t('loanRequest.returnAmountError'))
    else setErrorReurnAmoune('') 

    const newUnformattedValue = unformatNumber(newInputValue);
    setLoanReturn(newUnformattedValue);

  }

  return (
    <div className="flex flex-col items-center h-full">
      <BackLink backLinkText={t('loanRequest.backLink')} onClickBack={props.onClickBack}/>
      <LeftTitles title="loanRequest.title" description="loanRequest.subTitle" onClickBack={props.onClickBack} backString={t('loanRequest.backLink')}/>
      <div className="mt-8 w-92 md:w-96">    
        <form className="flex flex-col items-center justify-center">
            <div className="py-4 text-4xl font-semibold">
                <Icon icon="shekel"  className="inline-block w-5 h-5 pl-2" />
                {formatNumber(loanRequest)} 
            </div>
            <fieldset className="w-full">
              <div className="relative mt-10">
                
                {/* add to input diffrent color to the unselected side of the range */}
                <input id="labels-range-input" type="range" value={loanRequest} min="0" max="500000" step="5000" dir="ltr"
                  onChange={handleRangeChange} className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-sky"/>
                
                <span className="absolute text-sm text-sky end-0 -bottom-6">0</span>
                <span className="absolute text-sm text-sky start-0 -bottom-6">500,000</span>

              </div>
              <div className="flex flex-col w-full mt-14">
                {/* <div className="text-xl text-sky">{t('loanRequest.return')}</div> */}
                <Input type="text" id="loanReturn" name="loanReturn" placeholder={t('loanRequest.return')} value={loanReturn} onInput={onInputChange} error={errorReurnAmoune}/>
                <div className="text-center text-md text-sky">{t('loanRequest.returnDisclaimer')}</div>
              </div>
            </fieldset>
        </form>
      </div>
      <div className="mt-12 lg:pb-20 lg:mt-auto">
          <Button onClick={updateProfileHandler} disabled={!( Number(loanReturn)  && Number(loanRequest))  ? true : false}> {t('goalPage.action')}</Button>
        </div>
    </div>    

      
  )
}
