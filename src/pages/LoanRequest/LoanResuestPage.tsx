import { useCallback, useRef, useEffect, ChangeEvent, useState } from 'react'

import {Button, Input, RadioButtonGroup} from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { ELoanReason } from '@/core/api/types'
import { LeftTitles } from '@/components/sections/LeftTitles'
import { useAuth } from '@/core/context'
import { formatNumber, unformatNumber } from '@/utilities/utilities'


export interface ILoanRequestPageProps{
  onClickNext: () => void
}

export const LoanResuestPage = (props:ILoanRequestPageProps ) => {
  const { onClickNext } = props
  const [selectedValue, setSelectedValue] = useState('0' as ELoanReason)
  const [loanReturn, setLoanReturn] = useState('');
  const [errorReurnAmoune, setErrorReurnAmoune] = useState('');

  const aiRef = useRef(null)
  const { t } = useTranslation()
  const { user } = useAuth()
  useEffect(() => {
    
  }, [])

  const updateProfileHandler = async () => {

    console.log('monthlyReturn:', loanReturn, 'requestedLoan:', selectedValue) 
    onClickNext()
    return
    // if (user) {
    //   try {
    //     const response =   await updateLoanRequestApiCall({resone: selectedValue}, user)

    //     if (response) {
    //       console.log ('save goal response', response)
    //       onClickNext()
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   } 
    // }
    // else {
    //   // Alert ERROR
    //   console.log('user not found')
    // }
  }

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    const roundedValue = Math.round(newValue / 5000) * 5000; // Round to the nearest 5000
    setSelectedValue(roundedValue.toString() as ELoanReason);
  };


  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value;
    if (!/^\d+$/.test(newInputValue)) setErrorReurnAmoune(t('loanRequest.returnAmountError'))
    else setErrorReurnAmoune('') 

    const newUnformattedValue = unformatNumber(newInputValue);
    setLoanReturn(newUnformattedValue);

  }

  return (

    <div>
      <LeftTitles title="loanRequest.title" description="loanRequest.subTitle" />
          
      <form className="form flex justify-center items-center">
          <div className="py-4 text-2xl">
              {formatNumber(selectedValue)}
          </div>
          <fieldset className="w-full">
            <div className="relative mt-10">
              
              {/* add to input diffrent color to the unselected side of the range */}
              <input
                id="labels-range-input"
                type="range"
                value={selectedValue}
                min="0"
                max="500000"
                step="5000"
                onChange={handleRangeChange}
                className="w-full h-3 bg-sky rounded-lg appearance-none cursor-pointer"
                dir="ltr"
              />
              
              <span className="text-sm text-sky absolute end-0 -bottom-6">0</span>
              <span className="text-sm text-sky absolute start-0 -bottom-6">500,000</span>

            </div>
            <div className="mt-14 w-full flex flex-col">
              <div className="text-xl text-sky">{t('loanRequest.return')}</div>
              <Input type="text" id="loanReturn" name="loanReturn" value={loanReturn} onInput={onInputChange} error={errorReurnAmoune}/>
              <div className="pt-6 text-md text-sky ]">{t('loanRequest.returnDisclaimer')}</div>
            </div>
          </fieldset>
          
          <div className="form-button-group">
            <Button onClick={updateProfileHandler} disabled={!( Number(loanReturn)  && Number(selectedValue))  ? true : false}> {t('goalPage.action')}</Button>
          </div>
      </form>

    </div>    

      
  )
}
