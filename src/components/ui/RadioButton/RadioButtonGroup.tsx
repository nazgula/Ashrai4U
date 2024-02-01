import React from 'react'
import { RadioButton } from './RadioButton'
// import './style.scss'

interface IOption {
  label: string
  value: string
  name?: string
  disabled?: boolean
  className?: string
  divClassName?: string
  divConditionClassName?: string
}

interface IRadioButtonGroupProps {
  label: string
  options: IOption[]
  selectedValue?: string
  hasFullWidth?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  randerOnCondition?: () => React.ReactNode
  conditionValue?: string
  isCondition?: boolean
  divConditionClassName?: string
  aligment?: 'vertical' | 'horizontal'
}

export const RadioButtonGroup = (props: IRadioButtonGroupProps) => {
  const renderOptions = () => {
    return props.options.map(({ label, name, value, disabled, className, divClassName, divConditionClassName }: IOption, index) => {
      // const shortenedOptionLabel = label.replace(/\s+/g, '')
      const optionId = `radio-option-${value}`

      return (
        <div key={`div-${optionId}`} className={props.conditionValue === value && props.isCondition ? '' : 'mb-4'}>
          <RadioButton
            value={value}
            label={label}
            key={optionId}
            id={optionId}
            name={name}
            disabled={disabled}
            defaultChecked={props.selectedValue === value}
            onChange={props.onChange}
            className={className}
            divClassName={divClassName}
          />
        {props.conditionValue === value && props.isCondition && props.randerOnCondition ? props.randerOnCondition() : null}
        </div>
      )
    })
  }
  return (
    <fieldset className="radio-group">
      <legend className="radio-group__legend">{props.label}</legend>
      <div className={`radio-group__wrapper ${props.className}`}>{renderOptions()}</div>
    </fieldset>
  )
}
