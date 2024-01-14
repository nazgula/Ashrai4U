/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react'
import cn from 'classnames'

import { Icon } from '@/components/ui'

import './style.scss'

export interface IDropdownData {
  id?: string
  key: string
  value: string | number
  clickHandler?: () => any
}

interface IDropdownProps {
  _key: string
  header: string | JSX.Element
  data: IDropdownData[]
  hasAngle?: boolean
  isSelect?: boolean
  onClick?: (item: IDropdownData, key: string) => void | Promise<void>
}

export const Dropdown = ({
  _key,
  header,
  data,
  onClick,
  hasAngle = false,
  isSelect = false,
}: IDropdownProps) => {
  const [isDropDownOpen, setDropDownOpen] = useState<boolean>(false)

  const listItemHandler = useCallback(
    (item: IDropdownData, key: string) => {
      item.clickHandler && item?.clickHandler()
      onClick && onClick(item, key)
      setDropDownOpen(false)
    },
    [onClick],
  )

  return (
    <div className="dropdown">
      <div
        className={cn('dropdown-header', {
          'dropdown-header--select': isSelect,
        })}
        onClick={() => setDropDownOpen(!isDropDownOpen)}
      >
        {header}

        {hasAngle ? (
          isDropDownOpen ? (
            <Icon viewBox="0 0 24 24" size={'24px'} icon={'expandLess'} />
          ) : (
            <Icon viewBox="0 0 24 24" size={'24px'} icon={'expandMore'} />
          )
        ) : null}
      </div>
      {isDropDownOpen && (
        <ul className="dropdown-list">
          {data.map((item, index) => (
            <li
              className="dropdown-list__item"
              key={item?.id ? item.id : index}
            >
              <button
                type="button"
                disabled={item.key === header}
                onClick={() => listItemHandler(item, _key)}
              >
                {item.key}{' '}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
