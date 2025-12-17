import { useState, useEffect, useRef } from 'react'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'

export interface Message {
  id: number
  text: string
  timestamp: string
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/messages`)
      if (!response.ok) throw new Error('Failed to fetch messages')
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) throw new Error('Failed to send message')

      const newMessage = await response.json()
      setMessages((prev) => [...prev, newMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-green-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 relative overflow-hidden">
      {/* Background pattern overlay - contour drawings like Telegram */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='150' height='150' viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-width='3' opacity='0.4'%3E%3Cpath d='M15 30 L15 20 L12 17 L15 14 L18 17 L15 20 M15 30 L12 33 L15 36 L18 33 L15 30'/%3E%3Cpath d='M40 20 Q45 15 50 20 Q55 25 50 30 Q45 35 40 30 Q35 25 40 20'/%3E%3Ccircle cx='70' cy='25' r='10'/%3E%3Ccircle cx='67' cy='23' r='2' fill='%23000'/%3E%3Ccircle cx='73' cy='23' r='2' fill='%23000'/%3E%3Cpath d='M67 28 Q70 30 73 28'/%3E%3Cpath d='M100 20 L100 30 L97 33 L95 30 L95 25 L97 22 L100 20 M95 30 L92 33 L90 30'/%3E%3Cpath d='M125 15 Q130 12 135 15 Q140 18 135 21 Q130 24 125 21 Q120 18 125 15'/%3E%3Cpath d='M15 60 L25 57 L35 60 L32 65 L17 65 L15 60'/%3E%3Crect x='40' y='50' width='12' height='12'/%3E%3Cpath d='M40 55 L52 55 M46 50 L46 62'/%3E%3Crect x='70' y='45' width='18' height='18'/%3E%3Crect x='73' y='47' width='3' height='6'/%3E%3Crect x='82' y='47' width='3' height='6'/%3E%3Cpath d='M70 45 L79 40 L88 45'/%3E%3Cpath d='M100 60 L100 70 L97 73 L95 70 L95 65 L97 62 L100 60'/%3E%3Cpath d='M97 60 L95 57 L97 54 L100 57 L97 60'/%3E%3Crect x='125' y='52' width='15' height='11'/%3E%3Cpath d='M125 52 L132.5 57 L140 52'/%3E%3Cpath d='M15 90 Q18 85 20 90 L20 100 L17 103 L15 100 L15 90'/%3E%3Cellipse cx='40' cy='95' rx='8' ry='6'/%3E%3Ccircle cx='37' cy='93' r='1.5' fill='%23000'/%3E%3Ccircle cx='43' cy='93' r='1.5' fill='%23000'/%3E%3Cpath d='M40 98 Q41 100 40 102 Q39 100 40 98'/%3E%3Cpath d='M70 85 Q75 80 80 85 Q75 90 70 85'/%3E%3Cpath d='M75 85 L75 100'/%3E%3Cpath d='M100 85 Q105 82 110 85 Q107 90 102 90 Q100 87 100 85'/%3E%3Ccircle cx='102' cy='86' r='1.5' fill='%23000'/%3E%3Ccircle cx='107' cy='86' r='1.5' fill='%23000'/%3E%3Cellipse cx='125' cy='95' rx='6' ry='9'/%3E%3Cpath d='M122 90 L128 90 M122 92 L128 92 M122 94 L128 94 M122 96 L128 96'/%3E%3Cpath d='M15 130 L15 140 L12 143 L15 146 L18 143 L15 140'/%3E%3Cpath d='M12 143 L10 140 L12 137 M18 143 L20 140 L18 137'/%3E%3Cpath d='M40 135 L42 140 L47 140 L44 144 L45 149 L40 147 L35 149 L36 144 L32 140 L37 140 L40 135'/%3E%3Cpath d='M70 135 Q65 130 70 125 Q75 130 70 135 M70 125 Q62 120 70 115 Q78 120 70 125'/%3E%3Cpath d='M100 130 Q105 127 110 130 Q107 135 102 135 Q100 132 100 130'/%3E%3Ccircle cx='125' cy='135' r='5'/%3E%3Cpath d='M125 130 L125 127 M125 140 L125 143 M150 135 L152 135 M137 135 L135 135 M131 129 L133 127 M119 143 L117 141 M131 141 L133 143 M119 127 L117 129'/%3E%3Cpath d='M0 30 L0 20 L-3 17 L0 14 L3 17 L0 20 M0 30 L-3 33 L0 36 L3 33 L0 30'/%3E%3Cpath d='M150 20 Q155 15 160 20'/%3E%3Cpath d='M0 60 L10 57 L20 60 L17 65 L2 65 L0 60'/%3E%3Cpath d='M150 60 L160 57 L170 60 L167 65 L152 65 L150 60'/%3E%3Cpath d='M0 90 Q3 85 5 90 L5 100 L2 103 L0 100 L0 90'/%3E%3Cpath d='M150 85 Q155 80 160 85 Q155 90 150 85'/%3E%3Cpath d='M0 130 L0 140 L-3 143 L0 146 L3 143 L0 140'/%3E%3Cpath d='M150 135 L152 140 L157 140 L154 144 L155 149 L150 147 L145 149 L146 144 L142 140 L147 140 L150 135'/%3E%3Cpath d='M15 0 L15 10 L12 13 L15 16 L18 13 L15 10'/%3E%3Cpath d='M40 -5 Q45 -10 50 -5'/%3E%3Cpath d='M70 0 Q75 -5 80 0'/%3E%3Cpath d='M100 -5 Q105 -8 110 -5'/%3E%3Cpath d='M125 0 L125 10 L122 13 L125 16 L128 13 L125 10'/%3E%3Cpath d='M15 150 L15 160 L12 163 L15 166 L18 163 L15 160'/%3E%3Cpath d='M40 150 Q45 145 50 150'/%3E%3Cpath d='M70 150 L70 160 L67 163 L70 166 L73 163 L70 160'/%3E%3Cpath d='M100 150 Q105 147 110 150'/%3E%3Cpath d='M125 150 L125 160 L122 163 L125 166 L128 163 L125 160'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
          backgroundRepeat: 'repeat',
        }} />
      </div>

      <ChatHeader />
      <div className="flex-1 overflow-y-auto px-3 py-2 relative z-10">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSend={sendMessage} />
    </div>
  )
}

export default App

