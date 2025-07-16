// components/chatbot/ChatBubble.tsx

import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

// Props for each chat message bubble
interface ChatBubbleProps {
  text: string;   // The content of the message
  fromUser?: boolean;// Whether the message was sent by the user
  type?: string;
}

/**
 * ChatBubble component
 * Renders a single chat message as a styled bubble.
 * Aligns to the right for user messages, left for assistant messages.
 */

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, fromUser = false, type }) => {
  const isUserQuery = type === 'user-query';
  const isAssistantInfo = type === 'assistant-info';

  if (isUserQuery) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', px: 2, py: 1 }}>
        <Paper
          sx={{
            backgroundColor: '#E1EDFF',
            borderRadius: 2,
            px: 2,
            py: 1.5,
            maxWidth: '80%',
          }}
          elevation={0}
        >
          <Typography variant="body2">
            <strong>👤 You:</strong> {text}
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (isAssistantInfo) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', px: 2, py: 1 }}>
        <Paper
          sx={{
            backgroundColor: '#F3F0FF',
            borderRadius: 2,
            px: 2,
            py: 1.5,
            maxWidth: '80%',
          }}
          elevation={0}
        >
          <Typography variant="body2" sx={{ color: '#4A3F74', fontSize: '0.95rem' }}>
            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontWeight: 600 }}>
              <SmartToyIcon sx={{ color: '#7E57C2', fontSize: 18, mt: '-8px' }} />
              Assistant:
            </Box>{' '}
            {text}
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: fromUser ? 'flex-end' : 'flex-start',
        px: 2,
        py: 1,
      }}
    >
      <Paper
        sx={{
          p: 1.5,
          borderRadius: 2,// Rounded corners 
          maxWidth: '80%', // Prevent bubbles from stretching full width
          backgroundColor: fromUser ? '#E1EDFF' : '#f1f5fb',
        }}
        elevation={1}
      >
        <Typography variant="body2">
          {fromUser ? (
            <strong>👤 You:</strong>
          ) : (
            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontWeight: 600 }}>
              <SmartToyIcon sx={{ fontSize: 18 }} />
              Assistant:
            </Box>
          )}{' '}
          {text}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatBubble;
