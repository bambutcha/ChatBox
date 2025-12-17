import { Message } from '../App'

interface MessageItemProps {
  message: Message
}

const MessageItem = ({ message }: MessageItemProps) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  return (
    <div className="flex justify-end">
      <div className="flex items-end gap-1 max-w-[70%]">
        <div className="bg-green-200 rounded-2xl rounded-br-sm px-4 py-2 shadow-sm">
          <p className="text-gray-800 text-sm whitespace-pre-wrap break-words">
            {message.text}
          </p>
        </div>
        <div className="flex flex-col items-end gap-0.5 pb-1">
          <span className="text-xs text-gray-600">{formatTime(message.timestamp)}</span>
          <div className="flex items-center">
            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <svg className="w-3 h-3 text-green-600 -ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageItem

