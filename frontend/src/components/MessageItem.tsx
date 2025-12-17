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
    <div className="flex justify-end mb-1 md:mb-2">
      <div className="max-w-[75%] md:max-w-[60%]">
        <div className="bg-[#DCF8C6] rounded-2xl rounded-br-[4px] px-3 py-1.5 md:px-4 md:py-2 shadow-sm relative">
          <p className="text-[#000000] text-[15px] md:text-[16px] leading-[20px] md:leading-[22px] whitespace-pre-wrap break-words pr-12 md:pr-16">
            {message.text}
          </p>
          <div className="absolute bottom-1.5 md:bottom-2 right-2 md:right-3 flex items-center gap-1">
            <span className="text-[11px] md:text-[12px] text-[#667781] leading-none">{formatTime(message.timestamp)}</span>
            <svg className="w-[13px] h-[13px] md:w-[15px] md:h-[15px] text-[#53BDEB]" fill="currentColor" viewBox="0 0 16 15">
              <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.175a.366.366 0 0 0-.063-.51zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.175a.365.365 0 0 0-.063-.51z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageItem

