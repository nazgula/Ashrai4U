import { RadioButton } from './RadioButton'
import './style.scss'

interface IOption {
  label: string
  value: string
  name?: string
  disabled?: boolean
}

interface IRadioButtonGroupProps {
  label: string
  options: IOption[]
  hasFullWidth?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RadioButtonGroup = ({
  label,
  options,
  onChange,
}: IRadioButtonGroupProps) => {
  const renderOptions = () => {
    return options.map(({ label, name, value, disabled }: IOption, index) => {
      const shortenedOptionLabel = label.replace(/\s+/g, '')
      const optionId = `radio-option-${shortenedOptionLabel}`

      return (
        <RadioButton
          value={value}
          label={label}
          key={optionId}
          id={optionId}
          name={name}
          disabled={disabled}
          defaultChecked={index === 0}
          onChange={onChange}
        />
      )
    })
  }
  return (
    <fieldset className="radio-group">
      <legend className="radio-group__legend">{label}</legend>
      <div className="radio-group__wrapper">{renderOptions()}</div>
    </fieldset>
  )
}
