//components/chatbot/ChatIntro.tsx
import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const ChatIntro = () => (
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
);

export default ChatIntro;
