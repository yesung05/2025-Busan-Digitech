import React, { useState, useEffect, useRef } from 'react';
import { SPOTS, SCHEDULE } from './constants';
import { Spot, Category, ChatMessage } from './types';
import SpotCard from './components/SpotCard';
import SpotDetail from './components/SpotDetail';
import ScheduleTimeline from './components/ScheduleTimeline';
import { getGeminiResponse } from './services/geminiService';

// -- Navigation Icons --
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const MapIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const ChatIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'spots' | 'schedule' | 'chat'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: 'Annyeonghaseyo! 💜 I am your Busan K-Guide. Ask me anything about BTS spots or K-Drama locations!' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeTab === 'chat') scrollToBottom();
  }, [messages, activeTab]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    
    // Add temporary loading message
    const loadingMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: loadingMsgId, role: 'model', text: '', isLoading: true }]);

    const responseText = await getGeminiResponse(userMsg.text);

    setMessages(prev => prev.map(msg => 
      msg.id === loadingMsgId 
        ? { ...msg, text: responseText, isLoading: false } 
        : msg
    ));
  };

  const filteredSpots = selectedCategory === 'ALL' 
    ? SPOTS 
    : SPOTS.filter(s => s.category === selectedCategory);

  return (
    <div className="bg-white max-w-md mx-auto h-screen flex flex-col shadow-2xl relative overflow-hidden font-sans">
      
      {/* Header - Only show if not in detail view to save space, or keep it translucent? Let's hide it in detail view for immersion */}
      {!selectedSpot && (
        <header className="bg-white/90 backdrop-blur-md z-10 sticky top-0 px-4 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Busan K-Vibe 💜
            </h1>
            <p className="text-xs text-gray-500">For K-Culture Lovers</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-lg">
            🇰🇷
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar bg-gray-50 pb-20 relative">
        
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="p-4 space-y-6">
            {/* Hero */}
            <div className="relative rounded-3xl overflow-hidden h-64 shadow-lg group">
              <img 
                src="https://picsum.photos/seed/busanbridge/600/400" 
                alt="Busan Night View" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md w-fit mb-2">HOT PACKAGE</span>
                <h2 className="text-white text-2xl font-bold leading-tight">Follow the steps of BTS in Busan</h2>
                <p className="text-gray-200 text-sm mt-1">3 Days of magic, food, and culture.</p>
              </div>
            </div>

            {/* Quick Categories */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">What are you looking for?</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => { setSelectedCategory(Category.BTS); setActiveTab('spots'); setSelectedSpot(null); }}
                  className="bg-purple-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-purple-100 transition-colors border border-purple-100"
                >
                  <span className="text-3xl">🎤</span>
                  <span className="font-semibold text-purple-700">BTS Spot</span>
                </button>
                <button 
                   onClick={() => { setSelectedCategory(Category.DRAMA); setActiveTab('spots'); setSelectedSpot(null); }}
                   className="bg-pink-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-pink-100 transition-colors border border-pink-100"
                >
                  <span className="text-3xl">🎬</span>
                  <span className="font-semibold text-pink-700">K-Drama</span>
                </button>
                <button 
                   onClick={() => { setSelectedCategory(Category.FOOD); setActiveTab('spots'); setSelectedSpot(null); }}
                   className="bg-orange-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-orange-100 transition-colors border border-orange-100"
                >
                  <span className="text-3xl">🍜</span>
                  <span className="font-semibold text-orange-700">K-Food</span>
                </button>
                <button 
                   onClick={() => { setActiveTab('schedule'); setSelectedSpot(null); }}
                   className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-blue-100 transition-colors border border-blue-100"
                >
                  <span className="text-3xl">📅</span>
                  <span className="font-semibold text-blue-700">Itinerary</span>
                </button>
              </div>
            </div>

            {/* Featured */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-gray-800">Must Visit</h3>
                <button 
                  onClick={() => { setActiveTab('spots'); setSelectedSpot(null); }} 
                  className="text-sm text-purple-600 font-semibold"
                >
                  See All
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                {SPOTS.filter(s => s.highlight).map(spot => (
                  <div 
                    key={spot.id} 
                    onClick={() => { setSelectedSpot(spot); setActiveTab('spots'); }}
                    className="min-w-[200px] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all"
                  >
                    <img src={spot.imageUrl} className="h-28 w-full object-cover" alt={spot.name} />
                    <div className="p-3">
                      <h4 className="font-bold text-gray-800 truncate">{spot.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{spot.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SPOTS TAB */}
        {activeTab === 'spots' && (
          selectedSpot ? (
            <SpotDetail spot={selectedSpot} onBack={() => setSelectedSpot(null)} />
          ) : (
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Curated K-Spots</h2>
              
              {/* Filter Chips */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
                <button 
                  onClick={() => setSelectedCategory('ALL')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${selectedCategory === 'ALL' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
                >
                  All
                </button>
                {Object.values(Category).map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* List */}
              <div className="space-y-4">
                {filteredSpots.map(spot => (
                  <SpotCard 
                    key={spot.id} 
                    spot={spot} 
                    onClick={() => setSelectedSpot(spot)} 
                  />
                ))}
              </div>
            </div>
          )
        )}

        {/* SCHEDULE TAB */}
        {activeTab === 'schedule' && (
          <div className="p-4">
             <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Journey</h2>
              <p className="text-gray-500 text-sm">3 Days 2 Nights Partial Package</p>
             </div>

             {/* Day Selector */}
             <div className="flex justify-between bg-white rounded-xl p-2 shadow-sm mb-6 border border-gray-100">
               {SCHEDULE.map((s) => (
                 <button
                  key={s.day}
                  onClick={() => setSelectedDay(s.day)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${selectedDay === s.day ? 'bg-purple-100 text-purple-700 shadow-sm' : 'text-gray-400'}`}
                 >
                   Day {s.day}
                 </button>
               ))}
             </div>

             {/* Timeline */}
             <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-h-[400px]">
                <h3 className="text-lg font-bold text-purple-800 mb-2 border-b border-gray-100 pb-2">
                  {SCHEDULE.find(s => s.day === selectedDay)?.title}
                </h3>
                <ScheduleTimeline items={SCHEDULE.find(s => s.day === selectedDay)?.items || []} />
             </div>
          </div>
        )}

        {/* CHAT TAB */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-full bg-white">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2 text-sm flex-shrink-0">
                      👩🏻‍💻
                    </div>
                  )}
                  <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-purple-600 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    {msg.isLoading ? (
                      <div className="flex space-x-1 items-center h-5">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s'}}></div>
                      </div>
                    ) : (
                       // Simple formatting for bullet points if Gemini returns markdown style lists
                       msg.text.split('\n').map((line, i) => (
                         <span key={i} className="block mb-1">{line}</span>
                       ))
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about BTS spots or food..."
                  className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm shadow-sm"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 disabled:opacity-50 transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-100 py-2 px-6 flex justify-between items-center z-20 pb-safe">
        <button 
          onClick={() => { setActiveTab('home'); setSelectedSpot(null); }}
          className={`flex flex-col items-center gap-1 w-16 ${activeTab === 'home' ? 'text-purple-600' : 'text-gray-400'}`}
        >
          <HomeIcon />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button 
          onClick={() => { setActiveTab('spots'); setSelectedSpot(null); }}
          className={`flex flex-col items-center gap-1 w-16 ${activeTab === 'spots' ? 'text-purple-600' : 'text-gray-400'}`}
        >
          <MapIcon />
          <span className="text-[10px] font-medium">Spots</span>
        </button>
        <button 
          onClick={() => { setActiveTab('schedule'); setSelectedSpot(null); }}
          className={`flex flex-col items-center gap-1 w-16 ${activeTab === 'schedule' ? 'text-purple-600' : 'text-gray-400'}`}
        >
          <CalendarIcon />
          <span className="text-[10px] font-medium">Plan</span>
        </button>
        <button 
          onClick={() => { setActiveTab('chat'); setSelectedSpot(null); }}
          className={`flex flex-col items-center gap-1 w-16 ${activeTab === 'chat' ? 'text-purple-600' : 'text-gray-400'}`}
        >
          <ChatIcon />
          <span className="text-[10px] font-medium">AI Guide</span>
        </button>
      </nav>
    </div>
  );
};

export default App;