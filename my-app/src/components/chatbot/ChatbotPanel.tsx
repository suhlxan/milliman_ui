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
import { chatbotToggleButton }  from '../../pages/styles';

import * as chatStyles from './styles';

interface ChatbotPanelProps {
  visible: boolean;
  onClose?: () => void;
  width?: number;
}

const ChatbotPanel: React.FC<ChatbotPanelProps> = ({ visible, onClose, width }) => {
  const [shouldRender, setShouldRender] = useState(false); // controls mount
  const [open, setOpen] = useState(false); // controls open state

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
          sx={chatbotToggleButton}
        >
          <SmartToyIcon />
        </IconButton>
      )}

      {/* Main Chat Panel */}
      <Box sx={chatStyles.chatPanelContainer(width)}>
        <ChatHeader onClose={onClose} />
        <ChatIntro />

        <Box sx={chatStyles.chatMessagesContainer}>
          {messages.length === 0 ? (
            <Box sx={chatStyles.emptyChatMessage}>
              Ask a question to begin.
            </Box>
          ) : (
            messages.map((msg, i) => (
              <ChatBubble key={i} text={msg.text} fromUser={msg.fromUser} />
            ))
          )}
        </Box>

        {showSuggestions && (
          <>
            <ChatSuggestions onSelect={setInput} />
            <Box sx={{ px: 2, py: 1 }}>
              <Box sx={chatStyles.separatorLine} />
            </Box>
            <QuickAccordionSection onSelect={setInput} />
          </>
        )}

        <ChatInputBar value={input} onChange={setInput} onSend={handleSend} />
        {messages.length > 0 && <ChatClearButton onClear={clearChat} />}
      </Box>
    </>
  );
};

export default ChatbotPanel;
