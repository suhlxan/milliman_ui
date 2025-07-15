// components/chatbot/ChatBubble.tsx

import React from 'react';
import { Paper, Typography } from '@mui/material';

// Props for each chat message bubble
interface ChatBubbleProps {
  text: string;        // The content of the message
  fromUser?: boolean;  // Whether the message was sent by the user
}

/**
 * ChatBubble component
 * Renders a single chat message as a styled bubble.
 * Aligns to the right for user messages, left for assistant messages.
 */
const ChatBubble: React.FC<ChatBubbleProps> = ({ text, fromUser = false }) => {
  return (
    <Paper
      sx={{
        p: 1.5,
        borderRadius: 2,                        // Rounded corners 
        maxWidth: '80%',                        // Prevent bubbles from stretching full width
        backgroundColor: fromUser ? '#E1EDFF' : '#f1f5fb',
        alignSelf: fromUser ? 'flex-end' : 'flex-start', // Align left/right
      }}
      elevation={1}
    >
      <Typography variant="body2">{text}</Typography>
    </Paper>
  );
};

export default ChatBubble;
