const ChatHeader = () => {
  return (
    <div className="bg-[#517da2] text-white px-3 py-2.5 flex items-center gap-3 shadow-sm relative z-10">
      <button className="text-white p-1.5 -ml-1">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div className="w-10 h-10 rounded-full bg-[#8B4513] flex items-center justify-center text-white font-semibold text-base" style={{ fontFamily: 'cursive' }}>
        H
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-medium text-[16px] leading-tight">Hustlers Tech Agency</div>
        <div className="text-[13px] text-white/80 leading-tight">1 member</div>
      </div>
      
      <button className="text-white p-1.5 -mr-1">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      </button>
    </div>
  )
}

export default ChatHeader

