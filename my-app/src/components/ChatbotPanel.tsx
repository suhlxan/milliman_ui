// components/ChatPanel.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Avatar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ChatBubble from './ChatBubble';
import ChatInputBar from './ChatInputBar';

interface ChatbotPanelProps {
  visible: boolean; // true when submitted === true
  onClose?: () => void;
}

// const ChatbotPanel: React.FC<ChatbotPanelProps> = ({ visible }) => {
const ChatbotPanel: React.FC<ChatbotPanelProps> = ({ visible, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; fromUser: boolean }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Delay appearance after analysis is done
  // useEffect(() => {
  //   if (visible) {
  //     const delay = setTimeout(() => {
  //       setShouldRender(true);
  //       setOpen(true); // auto-open first time
  //     // }, 2000);
  //   }, 1000);
  //     return () => clearTimeout(delay);
  //   }
  // }, [visible]);
  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setOpen(true); // open immediately
    }
  }, [visible]);
  

  if (!shouldRender) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, fromUser: true }]);
    setInput('');
    setShowSuggestions(false);
  };

  return (
    <>
      {/* Floating icon (when closed) */}
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

      {/* Chat Panel */}
      <Box
        sx={{
          position: 'fixed',
          top: 50,
          left: open ? 0 : '-100%',
          opacity: open ? 1 : 0,
          transition: 'left 0.5s ease, opacity 0.5s ease',
          width: 360,
          height: 'calc(100% - 50px)',
          backgroundColor: '#fff',
          boxShadow: 6,
          zIndex: 1100,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            pt: 4, // 👈 Add top padding
            pb: 2,
            px: 2,
            bgcolor: '#ffffff',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography fontWeight={600}>Medical Assistant</Typography>
          {/* <IconButton onClick={() => setOpen(false)}> */}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Avatar + Intro */}
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Avatar
            className="avatar-pulse"
            sx={{ width: 72, height: 72, margin: '0 auto', bgcolor: '#1355E9' }}
          >
            M
          </Avatar>
          <Typography variant="subtitle1" mt={1}>
            Hello, I am a
          </Typography>
          <Typography variant="h6" fontWeight={700} color="#1355E9">
            Medical Assistant.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ask me anything about your claims, conditions, medications, or health risks.
          </Typography>
        </Box>

        {/* Chat Messages */}
        <Box
          sx={{
            flex: 1,
            px: 2,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {messages.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
              Ask a question to begin.
            </Typography>
          ) : (
            messages.map((msg, i) => (
              <ChatBubble key={i} text={msg.text} fromUser={msg.fromUser} />
            ))
          )}
        </Box>

        {/* Suggestions */}
        {showSuggestions && (
          <Box
            sx={{
              px: 2,
              pb: 1,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {[
              'Show me my active medications.',
              'What is my current heart risk score?',
              'Provide me my medical summary.',
            ].map((suggestion) => (
              <Box
                key={suggestion}
                onClick={() => setInput(suggestion)}
                sx={{
                  px: 2,
                  py: 1,
                  bgcolor: '#E1EDFF',
                  borderRadius: '16px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#d0e4ff',
                  },
                }}
              >
                {suggestion}
              </Box>
            ))}
          </Box>
        )}

        {/* Input Bar */}
        <ChatInputBar value={input} onChange={setInput} onSend={handleSend} />

        {/* Clear Chat History */}
        {messages.length > 0 && (
          <Box sx={{ px: 2, py: 1 }}>
            <Box
              onClick={() => {
                setMessages([]);
                setShowSuggestions(true);
              }}
              sx={{
                textAlign: 'center',
                fontSize: '0.85rem',
                color: '#1355E9',
                cursor: 'pointer',
                textDecoration: 'underline',
                '&:hover': {
                  color: '#1E58AA',
                },
              }}
            >
              Clear Chat History
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ChatbotPanel;
 