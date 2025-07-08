//components/ChatBubble.tsx
import React from 'react';
import { Paper, Typography } from '@mui/material';

interface ChatBubbleProps {
  text: string;
  fromUser?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, fromUser = false }) => {
  return (
    <Paper
      sx={{
        p: 1.5,
        borderRadius: 2,
        maxWidth: '80%',
        backgroundColor: fromUser ? '#E1EDFF' : '#f1f5fb',
        alignSelf: fromUser ? 'flex-end' : 'flex-start',
      }}
    >
      <Typography variant="body2">{text}</Typography>
    </Paper>
  );
};

export default ChatBubble;
