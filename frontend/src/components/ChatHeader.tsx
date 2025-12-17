const ChatHeader = () => {
  return (
    <div className="bg-blue-600 text-white px-4 py-3 flex items-center gap-3 shadow-md relative z-10">
      <button className="text-white hover:bg-blue-700 rounded-full p-1 transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold text-sm">
        H
      </div>
      
      <div className="flex-1">
        <div className="font-semibold">Hustlers Tech Agency</div>
        <div className="text-xs text-blue-100">1 member</div>
      </div>
      
      <button className="text-white hover:bg-blue-700 rounded-full p-1 transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>
    </div>
  )
}

export default ChatHeader

