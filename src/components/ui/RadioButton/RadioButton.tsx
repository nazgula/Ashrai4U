import { InputHTMLAttributes } from 'react'
  import './style.scss'

interface IRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  value: string
  error?: boolean
  disabled?: boolean
  className?: string
  divClassName?: string
}
export const RadioButton = ({
  id,
  label,
  value,
  disabled,
  className,
  divClassName,
  ...rest
}: IRadioButtonProps) => {
  console.log('className', className)
  return (
    <div className={`flex px-4 py-6 border border-solid rounded-lg border-sky hover:border-gray ${divClassName}`}>
      
        <input
          id={id}
          value={value}
          type="radio"
          disabled={disabled}
          {...rest}
          className={`radio__input ${className}`}
        />

        <label htmlFor={id} className="mr-2 text-xl text-sky">
           {label}
        </label>
    </div>
  )

}
