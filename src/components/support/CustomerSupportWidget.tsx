import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { CollabLocalIcon } from '../common/Logo';
import { 
  MessageSquare, 
  Mic, 
  MicOff, 
  Send, 
  X, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  User, 
  Building2, 
  ChevronDown, 
  Headphones, 
  ExternalLink,
  Bot,
  Zap,
  PhoneCall,
  CheckCircle2,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
}

export const CustomerSupportWidget: React.FC = () => {
  const { role, activeCreator, activeBusiness, businesses, campaigns } = useApp();
  const { t, l } = useT();

  // Widget visibility
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<'chat' | 'voice'>('chat');
  
  // Selected user perspective: 'creator' | 'business' (defaults to current app role)
  const [consultRole, setConsultRole] = useState<'creator' | 'business'>(role);
  
  // Model preference: 'fast' (3.1-flash-lite), 'general' (3.5-flash), 'complex' (3.1-pro-preview)
  const [modelSpeed, setModelSpeed] = useState<'fast' | 'general' | 'complex'>('general');

  // Audio speech synthesis toggle
  const [autoSpeech, setAutoSpeech] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: consultRole === 'business'
        ? 'Dạ em chào Anh/Chị! Em là Trợ lý AI CollabLocal 24/7. Em có thể tư vấn Anh/Chị cách lên ngân sách tuyển Creator (600K - 1.8M), cách chuẩn bị món Hero hút view, quy trình ký quỹ Escrow an toàn hoặc thiết lập mã voucher riêng cho quán ạ!'
        : 'Chào bạn Creator! Mình là Trợ lý AI CollabLocal 24/7. Bạn cần gợi ý quán cafe/ẩm thực ánh sáng đẹp, cách thương lượng thù lao, giải đáp cơ chế bảo vệ tiền ký quỹ Escrow 100%, hay cần gợi ý kịch bản mở đầu (hook 3s) triệu view thì nhắn mình ngay nhé!',
      timestamp: 'Vừa xong',
      model: 'gemini-3.5-flash'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Voice mode state
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceReply, setVoiceReply] = useState('');
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Sync consultRole when app role changes
  useEffect(() => {
    setConsultRole(role);
  }, [role]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen && activeMode === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeMode]);

  // Speech Recognition setup (Voice Input)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'vi-VN';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceStatus('listening');
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        if (activeMode === 'voice') {
          setVoiceTranscript(transcript);
        } else {
          setInputValue(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        setVoiceStatus('idle');
      };

      recognition.onend = () => {
        setIsListening(false);
        if (activeMode === 'voice') {
          // If we got a transcript, send to voice AI
          setVoiceStatus(prev => prev === 'listening' ? 'thinking' : prev);
        }
      };

      recognitionRef.current = recognition;
    }
  }, [activeMode]);

  // Speech Synthesis helper (Voice Output)
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Clean markdown symbols for natural reading
    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/•/g, ', ')
      .replace(/https?:\/\/\S+/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick Vietnamese voice if available
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi') || v.name.includes('Vietnamese'));
    if (viVoice) utterance.voice = viVoice;

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (activeMode === 'voice') setVoiceStatus('speaking');
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      if (activeMode === 'voice') setVoiceStatus('idle');
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      if (activeMode === 'voice') setVoiceStatus('idle');
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      if (activeMode === 'voice') setVoiceStatus('idle');
    }
  };

  // Send message in Chat Mode
  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputValue).trim();
    if (!messageContent || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          userRole: consultRole,
          modelPreference: modelSpeed
        })
      });

      const data = await response.json();
      const replyContent = data.reply || 'Dạ CollabLocal Support đã ghi nhận. Em có thể giúp gì thêm cho bạn ạ?';

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        model: data.model || 'gemini-3.5-flash'
      };

      setMessages(prev => [...prev, assistantMsg]);

      if (autoSpeech) {
        speakText(replyContent);
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'Dạ hiện tại hệ thống kết nối AI đang bận trong giây lát. Em gửi câu trả lời tham khảo: Tất cả thù lao trên CollabLocal đều được ký quỹ Escrow 100%, duyệt video trong 24 giờ và quán luôn chuẩn bị sẵn Tasting Menu miễn phí cho bạn ạ!',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        model: 'gemini-3.5-flash'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Voice Interaction Handler
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setVoiceStatus('idle');
    } else {
      stopSpeaking();
      setVoiceTranscript('');
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn('Recognition start error:', e);
      }
    }
  };

  // Send voice query when user finishes speaking
  const handleSendVoiceQuery = async () => {
    if (!voiceTranscript.trim()) return;
    setVoiceStatus('thinking');

    try {
      const response = await fetch('/api/ai/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: voiceTranscript,
          userRole: consultRole
        })
      });

      const data = await response.json();
      const spokenText = data.reply || 'Dạ CollabLocal Support đã lắng nghe bạn. Bạn cần tư vấn thêm về nội dung nào ạ?';
      setVoiceReply(spokenText);
      speakText(spokenText);
    } catch (err) {
      console.error('Voice query error:', err);
      const fallback = consultRole === 'business'
        ? 'Dạ em chào Anh Chị! Quán có thể thiết lập mức thù lao từ 600K đến 1.8M, ký quỹ Escrow an toàn và đón tiếp Creator theo khung giờ vắng khách để có góc quay đẹp nhất ạ.'
        : 'Chào bạn Creator! Bạn hoàn toàn yên tâm là tiền thù lao được ký quỹ 100% Escrow, quán luôn miễn phí Tasting Menu và duyệt video trong 24 giờ nhé!';
      setVoiceReply(fallback);
      speakText(fallback);
    }
  };

  // Suggested Prompts by Role
  const creatorSuggestions = [
    '💰 Mức cát-xê trung bình cho video review tại Hà Nội?',
    '🍽️ Quán nào đang có Tasting Menu miễn phí & góc quay đẹp?',
    '🛡️ Ký quỹ Escrow bảo vệ Creator hoạt động thế nào?',
    '📝 Gợi ý kịch bản mở đầu (hook 3s) triệu view cho cafe'
  ];

  const businessSuggestions = [
    '📊 Cách tạo chiến dịch thu hút nhiều Creator chất lượng?',
    '💵 Mức ngân sách hợp lý cho 1 video TikTok/Reels?',
    '🤝 Cần chuẩn bị những gì để đón tiếp ekip Creator chu đáo?',
    '🎁 Cách cấp mã voucher độc quyền cho fan của Creator'
  ];

  const currentSuggestions = consultRole === 'business' ? businessSuggestions : creatorSuggestions;

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.12)] border border-[#EBEBEB] text-[13px] font-semibold text-[#222222] animate-in fade-in slide-in-from-right-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Tư vấn Creator & Chủ Quán 24/7</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="group relative p-4 rounded-full bg-[#222222] hover:bg-black text-white shadow-[0_8px_25px_rgba(0,0,0,0.25)] border-2 border-white transition-all hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center"
            title="Mở Trợ lý AI Hỗ Trợ Khách Hàng (Chat & Voice)"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563EB] to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xs"></div>
            <div className="relative flex items-center justify-center">
              <Headphones className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#2563EB] border border-white"></span>
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Main Support Drawer Panel (Right Side of Website) */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 flex items-center justify-end p-2 sm:p-4 pointer-events-none">
          <div className="bg-white rounded-3xl w-full sm:w-[440px] h-[92vh] max-h-[740px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-[#EBEBEB] overflow-hidden flex flex-col relative pointer-events-auto animate-in slide-in-from-right-8 duration-300">
            
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shrink-0 border-b border-[#334155]/40">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 drop-shadow-sm">
                    <CollabLocalIcon className="w-10 h-10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-[15px] leading-tight font-display">CollabLocal AI Support</h3>
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    </div>
                    <span className="text-[11px] text-slate-300 flex items-center gap-1">
                      <span>Gemini 3.5 & 3.8 Live</span>
                      <span>•</span>
                      <span>Trực tuyến 24/7</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setAutoSpeech(!autoSpeech);
                      if (autoSpeech) stopSpeaking();
                    }}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      autoSpeech ? 'bg-white/25 border-white/40 text-white' : 'bg-white/10 border-white/15 text-white/70 hover:text-white'
                    }`}
                    title={autoSpeech ? 'Tắt đọc âm thanh' : 'Bật tự động đọc âm thanh'}
                  >
                    {autoSpeech ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      stopSpeaking();
                    }}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Consultation Role Switcher */}
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-2xl border border-white/15">
                <button
                  onClick={() => {
                    setConsultRole('creator');
                    setMessages(prev => [
                      ...prev,
                      {
                        id: `sys-${Date.now()}`,
                        role: 'assistant',
                        content: 'Dạ mình đã chuyển sang chế độ tư vấn dành cho Creator: Bạn cần hỗ trợ chọn quán, cách deal thù lao hay kịch bản review triệu view?',
                        timestamp: 'Vừa xong',
                        model: 'gemini-3.5-flash'
                      }
                    ]);
                  }}
                  className={`flex-1 py-1.5 px-2.5 rounded-xl text-[12px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    consultRole === 'creator'
                      ? 'bg-white text-[#222222] shadow-xs'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Dành Cho Creator</span>
                </button>

                <button
                  onClick={() => {
                    setConsultRole('business');
                    setMessages(prev => [
                      ...prev,
                      {
                        id: `sys-${Date.now()}`,
                        role: 'assistant',
                        content: 'Dạ em đã chuyển sang chế độ tư vấn dành cho Chủ Quán: Anh/Chị cần hỗ trợ tạo chiến dịch, lên ngân sách thù lao hay cách đón tiếp Creator?',
                        timestamp: 'Vừa xong',
                        model: 'gemini-3.5-flash'
                      }
                    ]);
                  }}
                  className={`flex-1 py-1.5 px-2.5 rounded-xl text-[12px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    consultRole === 'business'
                      ? 'bg-white text-[#222222] shadow-xs'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Dành Cho Chủ Quán</span>
                </button>
              </div>

              {/* Chat vs Live Voice Mode Tabs */}
              <div className="flex items-center justify-between pt-2.5 px-1 text-[12px]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveMode('chat');
                      stopSpeaking();
                    }}
                    className={`pb-1 border-b-2 font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                      activeMode === 'chat' ? 'border-[#2563EB] text-white' : 'border-transparent text-white/60 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Nhắn Tin (Chat)</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveMode('voice');
                      stopSpeaking();
                    }}
                    className={`pb-1 border-b-2 font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                      activeMode === 'voice' ? 'border-[#2563EB] text-white' : 'border-transparent text-white/60 hover:text-white'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Đàm Thoại Trực Tiếp (Voice AI)</span>
                  </button>
                </div>

                {/* Speed selector */}
                {activeMode === 'chat' && (
                  <div className="flex items-center gap-1 text-[11px] text-white/70">
                    <span className="font-mono bg-white/10 px-2 py-0.5 rounded-md border border-white/15">
                      {modelSpeed === 'fast' ? '⚡ 3.1-Lite' : modelSpeed === 'complex' ? '🧠 3.1-Pro' : '✨ 3.5-Flash'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* TAB 1: Chat Mode */}
            {activeMode === 'chat' && (
              <div className="flex-1 flex flex-col overflow-hidden bg-[#FAFAFA]">
                
                {/* Messages scroll area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                  {messages.map((msg) => {
                    const isUser = msg.role === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isUser && (
                          <div className="w-7 h-7 rounded-full shrink-0 mt-0.5 shadow-2xs overflow-hidden">
                            <CollabLocalIcon className="w-full h-full" />
                          </div>
                        )}

                        <div className={`space-y-1 max-w-[82%] ${isUser ? 'items-end' : 'items-start'}`}>
                          <div
                            className={`p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-2xs ${
                              isUser
                                ? 'bg-[#222222] text-white rounded-br-xs'
                                : 'bg-white text-[#222222] border border-[#EBEBEB] rounded-bl-xs'
                            }`}
                          >
                            <div className="whitespace-pre-line break-words">
                              {msg.content}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 px-1 text-[10px] text-[#717171]">
                            <span>{msg.timestamp}</span>
                            {!isUser && (
                              <button
                                onClick={() => speakText(msg.content)}
                                className="hover:text-[#222222] flex items-center gap-0.5 cursor-pointer"
                                title="Đọc to câu trả lời"
                              >
                                <Volume2 className="w-3 h-3 text-[#2563EB]" />
                                <span>Đọc</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {isLoading && (
                    <div className="flex items-center gap-2 p-3.5 bg-white rounded-2xl border border-[#EBEBEB] text-[13px] text-[#717171] w-max animate-pulse shadow-2xs">
                      <Bot className="w-4 h-4 text-[#2563EB] animate-spin" />
                      <span>CollabLocal AI đang phân tích dữ liệu...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestion Pills */}
                <div className="px-4 py-2 bg-white border-t border-[#EBEBEB] overflow-x-auto no-scrollbar shrink-0">
                  <div className="flex items-center gap-1.5 min-w-max">
                    <span className="text-[11px] font-bold text-[#717171] uppercase mr-1">Gợi ý:</span>
                    {currentSuggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(sug)}
                        className="text-[12px] px-2.5 py-1 rounded-full bg-[#F7F7F7] hover:bg-[#EFF6FF] text-[#222222] hover:text-[#2563EB] border border-[#EBEBEB] hover:border-[#2563EB]/30 transition-all cursor-pointer whitespace-nowrap"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Bar */}
                <div className="p-3 bg-white border-t border-[#EBEBEB] shrink-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    {/* Voice-to-Text Button */}
                    <button
                      type="button"
                      onClick={toggleListening}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                        isListening
                          ? 'bg-[#2563EB] text-white border-[#2563EB] animate-pulse'
                          : 'border-[#DDDDDD] text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7]'
                      }`}
                      title={isListening ? 'Dừng ghi âm' : 'Nói để nhập bằng giọng nói tiếng Việt'}
                    >
                      <Mic className="w-4 h-4" />
                    </button>

                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={consultRole === 'business' ? 'Hỏi về ngân sách, đón tiếp, tuyển Creator...' : 'Hỏi về thù lao, chọn quán, kịch bản quay...'}
                      className="flex-1 py-2 px-3.5 bg-[#F7F7F7] text-[13px] rounded-xl border border-transparent focus:border-[#222222] focus:bg-white transition-all outline-none"
                    />

                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isLoading}
                      className={`p-2.5 rounded-xl font-semibold transition-all shrink-0 cursor-pointer ${
                        inputValue.trim() && !isLoading
                          ? 'btn-airbnb-primary text-white shadow-xs'
                          : 'bg-[#EBEBEB] text-[#A0A0A0] cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Human Agent Contact Shortcut */}
                  <div className="flex items-center justify-between pt-2 px-1 text-[11px] text-[#717171]">
                    <span>Hotline CSKH: <strong className="text-[#222222]">0988 123 456</strong> (Zalo 24/7)</span>
                    <button
                      onClick={() => setModelSpeed(prev => prev === 'fast' ? 'general' : prev === 'general' ? 'complex' : 'fast')}
                      className="text-emerald-700 font-semibold hover:underline cursor-pointer"
                    >
                      Đổi tốc độ ({modelSpeed})
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: Live Voice AI Mode (Gemini 3.8 Live) */}
            {activeMode === 'voice' && (
              <div className="flex-1 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-[#FAFAFA] to-white overflow-y-auto text-center space-y-6">
                
                {/* Header Status */}
                <div className="space-y-1 pt-2">
                  <span className="text-[12px] font-bold font-mono text-[#2563EB] uppercase tracking-wider bg-[#EFF6FF] px-3 py-1 rounded-full border border-[#2563EB]/20">
                    Gemini 3.8 Live Voice
                  </span>
                  <h4 className="text-[18px] font-semibold text-[#222222] font-display">
                    {consultRole === 'business' ? 'Tư Vấn Giọng Nói Cho Chủ Quán' : 'Trò Chuyện Trực Tiếp Cùng Creator'}
                  </h4>
                  <p className="text-[12px] text-[#717171] max-w-xs mx-auto">
                    Nói trực tiếp bằng tiếng Việt, AI sẽ trả lời bạn bằng giọng nói tức thì.
                  </p>
                </div>

                {/* Animated Reactive Voice Orb */}
                <div className="relative flex items-center justify-center my-4">
                  {/* Outer pulse rings */}
                  <div className={`absolute w-44 h-44 rounded-full bg-rose-400/20 transition-transform duration-500 ${
                    voiceStatus === 'listening' ? 'scale-125 animate-ping' : voiceStatus === 'speaking' ? 'scale-110 animate-pulse' : 'scale-100'
                  }`} />
                  <div className={`absolute w-36 h-36 rounded-full bg-orange-400/20 transition-transform duration-300 ${
                    voiceStatus === 'listening' ? 'scale-115' : voiceStatus === 'speaking' ? 'scale-105' : 'scale-100'
                  }`} />

                  {/* Main Glowing Circle */}
                  <div className={`relative w-28 h-28 rounded-full shadow-2xl flex items-center justify-center border-4 border-white transition-all duration-300 ${
                    voiceStatus === 'listening'
                      ? 'bg-gradient-to-tr from-[#2563EB] to-amber-500 scale-110 shadow-rose-300'
                      : voiceStatus === 'speaking'
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 scale-105 shadow-emerald-200'
                      : voiceStatus === 'thinking'
                      ? 'bg-gradient-to-tr from-purple-600 to-indigo-500 animate-pulse'
                      : 'bg-gradient-to-tr from-[#222222] to-[#444444]'
                  }`}>
                    {voiceStatus === 'listening' ? (
                      <Mic className="w-10 h-10 text-white animate-bounce" />
                    ) : voiceStatus === 'speaking' ? (
                      <Volume2 className="w-10 h-10 text-white animate-pulse" />
                    ) : voiceStatus === 'thinking' ? (
                      <Sparkles className="w-10 h-10 text-white animate-spin" />
                    ) : (
                      <Headphones className="w-10 h-10 text-white" />
                    )}
                  </div>
                </div>

                {/* Status text */}
                <div className="space-y-1">
                  <div className="text-[14px] font-semibold text-[#222222]">
                    {voiceStatus === 'listening' && 'Đang lắng nghe bạn nói...'}
                    {voiceStatus === 'thinking' && 'Gemini Live đang chuẩn bị câu trả lời...'}
                    {voiceStatus === 'speaking' && 'Đang trả lời bằng giọng nói...'}
                    {voiceStatus === 'idle' && 'Nhấn micro bên dưới để bắt đầu nói'}
                  </div>

                  {voiceTranscript && (
                    <div className="p-3 bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] text-[13px] text-[#222222] max-w-sm mx-auto italic">
                      "{voiceTranscript}"
                    </div>
                  )}

                  {voiceReply && (
                    <div className="p-3 bg-[#EFF6FF] rounded-xl border border-[#2563EB]/20 text-[13px] text-[#222222] max-w-sm mx-auto text-left leading-relaxed">
                      <strong className="text-[#2563EB] block mb-1">AI Trả Lời:</strong>
                      {voiceReply}
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 pb-4">
                  {voiceStatus === 'speaking' ? (
                    <button
                      onClick={stopSpeaking}
                      className="px-6 py-3 rounded-full bg-red-600 text-white text-[14px] font-semibold shadow-md hover:bg-red-700 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <VolumeX className="w-4 h-4" />
                      <span>Dừng Phát Âm</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={toggleListening}
                        className={`px-7 py-3.5 rounded-full text-[14px] font-semibold shadow-lg transition-all flex items-center gap-2.5 cursor-pointer ${
                          isListening
                            ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                            : 'btn-airbnb-primary text-white hover:scale-105'
                        }`}
                      >
                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        <span>{isListening ? 'Hoàn Tất Nói' : 'Bắt Đầu Nói'}</span>
                      </button>

                      {voiceTranscript && !isListening && (
                        <button
                          onClick={handleSendVoiceQuery}
                          className="px-5 py-3.5 rounded-full bg-[#222222] text-white text-[13px] font-semibold hover:bg-black transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Send className="w-4 h-4" />
                          <span>Hỏi Lại</span>
                        </button>
                      )}
                    </>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
