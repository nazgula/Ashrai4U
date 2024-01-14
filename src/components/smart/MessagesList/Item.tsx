/* eslint-disable @typescript-eslint/ban-ts-comment */
import cn from 'classnames'
import { EMessageType, IMessage } from './MessagesList'
import { Attachment } from './Attachment'

interface IMessageListItemProps {
  message: IMessage
  onClick?: (payload: { [key: string]: string | string[] }) => void
}
export const MessageListItem = ({ message }: IMessageListItemProps) => {
  return (
    <div
      className={cn('message-wrapper', {
        error: message.type === EMessageType.error,
      })}
      data-position={message.position}
      key={message.id}
    >
      <div
        className={cn('message', {
          'message--right': message.position === 'right',
          'message--left': message.position === 'left',
        })}
      >
        <div className="message__content">{message.text}</div>
        {message.attachment && <Attachment attachment={message.attachment} />}
      </div>
    </div>
  )
}
