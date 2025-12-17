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
    <div className="bg-white px-4 py-3 flex items-center gap-2 relative z-10 shadow-lg">
      <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Message"
          className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
        />
      </div>
      <button
        onClick={handleSend}
        disabled={!text.trim()}
        className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </div>
  )
}

export default MessageInput

