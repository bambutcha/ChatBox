import { Message } from '../App'
import MessageItem from './MessageItem'

interface MessageListProps {
  messages: Message[]
}

const MessageList = ({ messages }: MessageListProps) => {
  if (messages.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessageList

