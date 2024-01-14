import { InputHTMLAttributes } from 'react'
import './style.scss'
interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string | JSX.Element
  isChecked: boolean
  setIsChecked: (value: boolean) => void
}
export const Checkbox = ({
  name,
  label,
  isChecked,
  setIsChecked,
  ...props
}: ICheckboxProps) => {
  return (
    <div className="checkbox">
      <label>
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          {...props}
        />
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="9"
            viewBox="0 0 10 9"
            fill="none"
          >
            <path
              d="M1 3.87891L3.66667 7.25391L9 1.25391"
              stroke="#1E75E5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {label}
      </label>
    </div>
  )
}
