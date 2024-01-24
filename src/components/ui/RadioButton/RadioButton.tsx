import { InputHTMLAttributes } from 'react'
import './style.scss'

interface IRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  value: string
  error?: boolean
  disabled?: boolean
}
export const RadioButton = ({
  id,
  label,
  value,
  disabled,
  ...rest
}: IRadioButtonProps) => {
  return (
    <div className="radio">
      
        <input
          id={id}
          value={value}
          type="radio"
          disabled={disabled}
          {...rest}
          className="radio__input"
        />
        <label htmlFor={id} className="radio__label">
          {label}
        </label>
      
    </div>
  )
}
