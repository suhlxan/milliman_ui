//components/chatbot/ChatPanel.tsx
import React, { useState, useEffect } from 'react';

import { Box, IconButton } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

import ChatBubble from './ChatBubble';
import ChatInputBar from './ChatInputBar';
import ChatHeader from './ChatHeader';
import ChatIntro from './ChatIntro';
import ChatSuggestions from './ChatSuggestions';
import ChatClearButton from './ChatClearButton';
import QuickAccordionSection from './QuickAccordionSection';

interface ChatbotPanelProps {
  visible: boolean;
  onClose?: () => void;
  width?: number;
}

const ChatbotPanel: React.FC<ChatbotPanelProps> = ({ visible, onClose, width }) => {
  const [shouldRender, setShouldRender] = useState(false); // controls whether panel is mounted
  const [open, setOpen] = useState(false); // controls panel open/closed state

  // Chat state
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; fromUser: boolean }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setOpen(true);
    }
  }, [visible]);

  if (!shouldRender) return null;

  // Handles user input submission
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, fromUser: true }]);
    setInput('');
    setShowSuggestions(false);
  };

  const clearChat = () => {
    setMessages([]);
    setShowSuggestions(true);
  };

  return (
    <>
      {/* Floating open icon when chat is closed */}
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 20,
            left: 20,
            backgroundColor: '#1355E9',
            color: '#fff',
            zIndex: 1000,
            '&:hover': { backgroundColor: '#1E58AA' },
          }}
        >
          <SmartToyIcon />
        </IconButton>
      )}

      {/* Main Chat Panel */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: open ? 0 : `-${width ?? 400}px`,
          opacity: open ? 1 : 0,
          transition: 'opacity 0.3s ease',
          width: width ?? 400,
          height: '100%',
          backgroundColor: '#fff',
          boxShadow: 6,
          zIndex: 1100,
          display: 'flex',
          flexDirection: 'column',

          // Scroll settings applied to entire panel
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',

          // 👇 Custom scrollbar styles
          '&::-webkit-scrollbar': {
            width: '0px',
            transition: 'width 0.3s ease-in-out',
          },
          '&:hover::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#b0b0b0',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#888888',
          },

        }}
      >
        {/* Header with title and close button */}
        <ChatHeader onClose={onClose} />

        {/* Intro message and avatar */}
        <ChatIntro />

        {/* Chat history + message log */}
        <Box
          sx={{
            flex: 1,
            px: 2,
            //overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {messages.length === 0 ? (
            <Box sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
              Ask a question to begin.
            </Box>
          ) : (
            messages.map((msg, i) => (
              <ChatBubble key={i} text={msg.text} fromUser={msg.fromUser} />
            ))
          )}
        </Box>

        {/* Suggestion prompts (only shown initially) */}
        {/* {showSuggestions && <ChatSuggestions onSelect={setInput} />} */}
        {showSuggestions && (
          <>
            <ChatSuggestions onSelect={setInput} />

            {/* Separator line */}
            <Box sx={{ px: 2, py: 1 }}>
              <Box sx={{ height: '1px', backgroundColor: '#E0E0E0', my: 2 }} />
            </Box>

            {/* Quick Questions Accordion */}
            <QuickAccordionSection onSelect={setInput} />
          </>
        )}

        {/* Chat input area */}
        <ChatInputBar value={input} onChange={setInput} onSend={handleSend} />

        {/* Clear history button shown when chat has content */}
        {messages.length > 0 && <ChatClearButton onClear={clearChat} />}
      </Box>
    </>
  );
};

export default ChatbotPanel;
