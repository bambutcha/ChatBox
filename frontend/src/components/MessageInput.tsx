import { useState, KeyboardEvent } from 'react'

interface MessageInputProps {
  onSend: (text: string) => void
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [text, setText] = useState('')

  const handleSend = () => {
    if (text.trim()) {
      onSend(text)
      setText('')
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="px-3 py-2.5 md:px-6 md:py-4 flex items-center gap-2 relative z-10">
      <div className="flex-1 bg-[#F0F0F0] rounded-[21px] px-4 py-2 md:px-6 md:py-3 flex items-center min-h-[42px] md:min-h-[50px] relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Message"
          className="flex-1 bg-transparent border-none outline-none text-[#000000] placeholder-[#999999] text-[15px] md:text-[16px] leading-[20px] md:leading-[22px] pr-12 md:pr-14"
        />
        {text.trim() && (
          <button
            onClick={handleSend}
            className="absolute right-1.5 md:right-2 bg-[#239aef] text-white rounded-full hover:bg-[#1e8ad8] transition-colors w-[32px] h-[32px] md:w-[36px] md:h-[36px] flex items-center justify-center"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 rotate-[-45deg]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default MessageInput

