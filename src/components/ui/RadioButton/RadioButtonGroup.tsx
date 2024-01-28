import { RadioButton } from './RadioButton'
// import './style.scss'

interface IOption {
  label: string
  value: string
  name?: string
  disabled?: boolean
  className?: string
}

interface IRadioButtonGroupProps {
  label: string
  options: IOption[]
  selectedValue?: string
  hasFullWidth?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export const RadioButtonGroup = (props: IRadioButtonGroupProps) => {
  const renderOptions = () => {
    return props.options.map(({ label, name, value, disabled, className }: IOption, index) => {
      // const shortenedOptionLabel = label.replace(/\s+/g, '')
      const optionId = `radio-option-${value}`

      return (
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
        />
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
