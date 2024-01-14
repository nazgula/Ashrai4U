import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import './style.scss'
interface IOTPFieldProps {
  onChange?: (value: Array<string>) => void
  error?: boolean
}

let currentOTPIndex: number = 0

export const OTPField = ({ onChange, error }: IOTPFieldProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0)

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { value } = target
    const newOTP: string[] = [...otp]
    newOTP[currentOTPIndex] = value.substring(value.length - 1)

    if (!value) setActiveOTPIndex(currentOTPIndex - 1)
    else setActiveOTPIndex(currentOTPIndex + 1)

    setOtp(newOTP)
    onChange && onChange(newOTP)
  }

  const handleKeyDown = (
    { key }: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    currentOTPIndex = index
    if (key === 'Backspace') setActiveOTPIndex(currentOTPIndex - 1)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOTPIndex])

  return (
    <div className={`otp-list ${error ? 'error' : ''}`}>
      {otp.map((_, index) => {
        return (
          <div className="otp-list__item" key={index}>
            <input
              ref={index === activeOTPIndex ? inputRef : null}
              type="number"
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, index)}
              value={otp[index]}
              className={otp[index] !== '' ? 'is-fill' : ''}
            />
            {index === otp.length - 1 ? null : <span />}
          </div>
        )
      })}
    </div>
  )
}
