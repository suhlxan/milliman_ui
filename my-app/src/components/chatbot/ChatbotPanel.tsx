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
import { chatbotToggleButton } from '../../pages/styles';
import AgentService from '../../api/AgentService';

import * as chatStyles from './styles';

interface ChatbotPanelProps {
  visible: boolean;
  onClose?: () => void;
  width?: number;
  sessionId: string;
}

const ChatbotPanel: React.FC<ChatbotPanelProps> = ({ visible, onClose, width, sessionId }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; fromUser: boolean; type?: string }[]>([]);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setOpen(true);
    }
  }, [visible]);

  if (!shouldRender) return null;

  const sendMessage = async (text: string) => {
    const userMessage = { text, fromUser: true };
    const newChatEntry = { role: 'user', content: text };

    setMessages((prev) => [...prev, userMessage]);
    setChatHistory((prev) => [...prev, newChatEntry]);
    setInput('');
    setShowSuggestions(false);
    setLoading(true);

    try {
      const response = await AgentService.sendChatMessage(sessionId, text, [...chatHistory, newChatEntry]);

      // const assistantMessage = {
      //   text: response,
      //   fromUser: false,
      //   type: 'assistant-info',
      // };
      const assistantText = response?.response || 'No response received.';

      const assistantMessage = {
        text: assistantText,
        fromUser: false,
        type: 'assistant-info',
      };

      const assistantChatEntry = { role: 'agent', content: assistantText };
      //const assistantChatEntry = { role: 'agent', content: response };

      setMessages((prev) => [...prev, assistantMessage]);
      setChatHistory((prev) => [...prev, assistantChatEntry]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: 'Something went wrong. Please try again.', fromUser: false, type: 'error' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
  };

  const clearChat = () => {
    setMessages([]);
    setChatHistory([]);
    setShowSuggestions(true);
  };

  return (
    <>
      {!open && (
        <IconButton onClick={() => setOpen(true)} sx={chatbotToggleButton}>
          <SmartToyIcon />
        </IconButton>
      )}

      <Box sx={chatStyles.chatPanelContainer(width)}>
        <ChatHeader onClose={onClose} />
        <ChatIntro />

        <Box sx={chatStyles.chatMessagesContainer}>
          {messages.length === 0 ? (
            <Box sx={chatStyles.emptyChatMessage}>Ask a question to begin.</Box>
          ) : (
            messages.map((msg, i) => (
              <ChatBubble key={i} text={msg.text} fromUser={msg.fromUser} type={msg.type} />
            ))
          )}
          {loading && (
            <ChatBubble text="Typing..." fromUser={false} type="loading" />
          )}
        </Box>

        {messages.length === 0 ? (
          <>
            <ChatSuggestions onSelect={sendMessage} />
            <Box sx={{ px: 2, py: 1 }}>
              <Box sx={chatStyles.separatorLine} />
            </Box>
          </>
        ) : (
          <Box sx={{ px: 2, py: 1 }}>
            <Box sx={chatStyles.separatorLine} />
          </Box>
        )}

        <QuickAccordionSection
          onSelect={(value) => {
            sendMessage(value);
            setExpandedIndex(null);
          }}
          expandedIndex={expandedIndex}
          setExpandedIndex={setExpandedIndex}
        />

        <ChatInputBar
          value={input}
          onChange={setInput}
          onSend={handleSend}
        />

        {messages.length > 0 && <ChatClearButton onClear={clearChat} />}
      </Box>
    </>
  );
};

export default ChatbotPanel;
