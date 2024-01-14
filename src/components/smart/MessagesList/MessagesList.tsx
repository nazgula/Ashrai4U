/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from 'classnames'
import { MessageListItem } from './Item'

import './style.scss'
import { ELoaderStatus, Loader } from '@/components/sections'
import { useEffect, useRef } from 'react'

export enum EMessagePosition {
  left = 'left',
  right = 'right',
}
export enum EMessageType {
  text = 'text',
  error = 'error',
  attachment = 'attachment',
}
export interface IMessage {
  id?: string
  position: EMessagePosition
  type?: EMessageType
  text: string | JSX.Element
  date?: Date
  attachment?: {
    name: string
    data: { value: string; label: string }[]
    isMultiple?: boolean
  }
}
export interface IMessagesListProps {
  dataSource: IMessage[]
  loadingState: ELoaderStatus | null
  attachmentHandler?: (payload: {
    [key: string]: string | string[]
  }) => void | Promise<void>
}

export const MessagesList = ({
  dataSource,
  loadingState,
}: IMessagesListProps) => {
  const messagesEndRef = useRef(null)
  const messagesListRef = useRef(null)

  const scrollToElement = () => {
    // @ts-ignore
    messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight
  }

  useEffect(() => {
    scrollToElement()
  }, [dataSource])

  return (
    <div className={cn('messages-list', {})} ref={messagesListRef}>
      {dataSource.map((message) => (
        <MessageListItem message={message} key={message.id} />
      ))}
      <div ref={messagesEndRef} />
      {loadingState && <Loader status={loadingState} />}
    </div>
  )
}
