
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { askNexus } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface TerminalChatProps {
  isOpen: boolean;
  onClose: () => void;
  currentContext: string;
}

const TerminalChat: React.FC<TerminalChatProps> = ({ isOpen, onClose, currentContext }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Nexus Intelligence active. How can I assist with your market analysis today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await askNexus(userMsg, currentContext);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Nexus Intelligence</h3>
            <p className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              L3 ANALYSIS ONLINE
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
          <X size={20} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-800/50 text-slate-200 border border-slate-700'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {msg.role === 'assistant' ? <Sparkles size={12} className="text-indigo-400" /> : <User size={12} className="text-indigo-200" />}
                <span className="text-[10px] uppercase font-black tracking-widest opacity-50">
                  {msg.role === 'assistant' ? 'Nexus.AI' : 'Institutional.User'}
                </span>
              </div>
              <div className="prose prose-invert prose-sm">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800/50 border border-slate-700 p-3 rounded-xl">
              <Loader2 className="animate-spin text-indigo-400" size={18} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about market context..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-4 pr-12 py-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none text-slate-200 placeholder:text-slate-600"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-md transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[9px] text-slate-500 mt-2 text-center italic">
          Nexus uses Gemini-3-Flash for real-time market synthesis.
        </p>
      </div>
    </div>
  );
};

export default TerminalChat;
