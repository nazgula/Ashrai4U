import {
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import cn from 'classnames'
import { Loading } from '@/components/ui'
import './style.scss'

export enum EButtonType {
  submit = 'submit',
  reset = 'reset',
  button = 'button',
}

interface IButtonProps {
  children: ReactNode
  type?: EButtonType
  disabled?: boolean
  isLoading?: boolean
  isLinkView?: boolean
  className?: string
  onClick?: (e?: SyntheticEvent) => void | Promise<void>
}

export const Button = ({
  type = EButtonType.button,
  onClick,
  children,
  disabled,
  isLoading,
  isLinkView,
  className: customClassName,
  ...rest
}: IButtonProps) => {
  const [showLoader, setShowLoader] = useState(false)
  const [isInternalLoading, setIsInternalLoading] = useState(false)

  useEffect(() => {
    if (isLoading || isInternalLoading) {
      setShowLoader(true)
    }
  }, [isLoading, isInternalLoading])

  const handleClick = useCallback(
    async (e?: SyntheticEvent) => {
      try {
        setIsInternalLoading(true)
        onClick && (await onClick(e))
      } catch (error) {
        setShowLoader(false)
        setIsInternalLoading(false)
      } finally {
        setShowLoader(false)
        setIsInternalLoading(false)
      }
    },
    [onClick],
  )

  return (
    <button
      className={cn('button', {
        'button--link': isLinkView,
        [`${customClassName}`]: customClassName,
      })}
      type={type}
      onClick={handleClick}
      disabled={showLoader || isInternalLoading || disabled}
      {...rest}
    >
      {showLoader ? <Loading /> : children}
    </button>
  )
}
