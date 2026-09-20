import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { querySahayAssistant } from '../../services/aiAssistant';
import { Sparkles, X, Send, HelpCircle, ShieldAlert } from 'lucide-react';

export const SahayAssistDrawer = () => {
  const { isSahayAssistOpen, setIsSahayAssistOpen, currentCase } = useApp();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! I am SAHAY Assist, an operational helper for helpline officers. How can I assist you with case indicators or platform workflows?',
      type: 'general'
    }
  ]);
  const [input, setInput] = useState('');

  if (!isSahayAssistOpen) return null;

  const handleSend = (textToSend) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: queryText }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      const response = querySahayAssistant(queryText, currentCase);
      setMessages([...newMessages, { sender: 'bot', text: response.text, type: response.type }]);
    }, 400);
  };

  const sampleQueries = [
    "What does an SVI of 84 mean?",
    "Why was this case flagged?",
    "What support options are available?",
    "Translate this statement into Hindi.",
    "What information has already been collected?"
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#FCFAF6] border-l border-[#E8E0D3] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="p-4 border-b border-[#E8E0D3] bg-[#7A1F2B] text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#C88A32]" />
          <div>
            <h3 className="font-serif font-bold text-sm">SAHAY Assist</h3>
            <p className="text-[10px] text-[#FCFAF6]/80">AI Operational Helper • Human-in-the-Loop</p>
          </div>
        </div>
        <button
          onClick={() => setIsSahayAssistOpen(false)}
          className="p-1 rounded hover:bg-[#651925] text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Warning Notice */}
      <div className="bg-[#C88A32]/10 border-b border-[#C88A32]/30 px-4 py-2 text-[11px] text-[#24221F] flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-[#C88A32] shrink-0" />
        <span>SAHAY Assist is non-diagnostic. Does not make legal, police, or psychiatric conclusions.</span>
      </div>

      {/* Message Chat Body */}
      <div className="p-4 flex-1 overflow-y-auto space-y-3 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-lg leading-relaxed whitespace-pre-line ${
                m.sender === 'user'
                  ? 'bg-[#7A1F2B] text-white rounded-br-none'
                  : 'bg-[#F7F4EE] border border-[#E8E0D3] text-[#24221F] rounded-bl-none shadow-xs'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-2 bg-[#F7F4EE] border-t border-[#E8E0D3] space-y-1.5">
        <div className="text-[10px] font-semibold text-[#6E6A64] uppercase">Suggested Officer Questions:</div>
        <div className="flex flex-wrap gap-1.5">
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] bg-[#FCFAF6] border border-[#E8E0D3] hover:border-[#7A1F2B] hover:text-[#7A1F2B] px-2 py-1 rounded text-left transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-[#E8E0D3] bg-[#FCFAF6] flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask SAHAY Assist about SVI indicators..."
          className="flex-1 bg-[#F7F4EE] border border-[#E8E0D3] rounded-md px-3 py-2 text-xs focus:outline-none focus:border-[#7A1F2B]"
        />
        <button
          onClick={() => handleSend()}
          className="p-2 bg-[#7A1F2B] hover:bg-[#651925] text-white rounded-md cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
