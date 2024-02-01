/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HTMLAttributes, forwardRef, useRef, useState } from 'react'
import classNames from 'classnames'

import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'

import './style.scss'

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  type: 'text' | 'number' | 'email' | 'password'
  value: string | number
  name?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  readOnly?: boolean
  className?: string
  autofocus?: boolean
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, value, name, placeholder, disabled, error, className, autofocus,  ...rest }, ref) => {
    const [isShowPassword, setPasswordVisibility] = useState<boolean>(false)
    const inputRef = useRef(null)
    return (
      <>
        <div
          className={classNames(className, 'input-wrapper', { 'has-error': error })}
          {...{ ...rest, ref }}
        >
          <input
            {...{ ...rest }}
            type={
              // type === 'password'
              //   ? isShowPassword
              //     ? 'text'
              //     : 'password'
              //   :
                 type
            }
            ref={inputRef}
            value={value}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={true}
            autoComplete="false"
            className="margin20"
            autoFocus={autofocus}
            onFocus={() => {
              console.log(
                inputRef.current &&
                  // @ts-ignore
                  inputRef.current.removeAttribute('readonly'),
              )
            }}
          />
          {/* {type === 'password' && (
            <Button
              onClick={() => {
                setPasswordVisibility(!isShowPassword)
              }}
            >
              {isShowPassword ? (
                <Icon viewBox="0 0 24 24" size={'26px'} icon={'eyeHidden'} />
              ) : (
                <Icon viewBox="0 0 24 24" size={'26px'} icon={'eye'} />
              )}
            </Button>
          )} */}
          {<div className="error">{error}</div>}
        </div>
      </>
    )
  },
)
