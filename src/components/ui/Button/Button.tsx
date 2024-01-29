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

  const getCss = (): string => {
    if (isLinkView) return 'text-sky underline hover:text-blue bg-transparent active:text-blue-800 focus:text-blue-700 disabled:hover:text-gray-600 disabled:focus:text-gray-600'
    else return 'w-48 py-6 rounded-xl border border-sky text-white active:bg-white active:text-blue-500 hover:bg-yellow disabled:bg-gray-400 disabled:border-gray-400 disabled:text-white disabled:hover:text-white disabled:focus:text-white md:w-44 md:h-9 md:font-semibold md:text-base md:px-4 md:text-xl'
  }

  return (
    <button
       // className={cn('button', {'button--link': isLinkView,[`${customClassName}`]: customClassName,})}
      className={`inline-flex items-center justify-center cursor-pointer text-lg font-semibold transition ease-in-out duration-400 disabled:cursor-not-allowed bg-purple disabled:bg-gray  ${getCss()} ${customClassName}`}
      type={type}
      onClick={handleClick}
      disabled={showLoader || isInternalLoading || disabled}
      {...rest}
    >
      {showLoader ? <Loading /> : children}
    </button>
  )
}
