//components/chatbot/ChatClearButton.tsx
import React from 'react';
import { Box } from '@mui/material';

const ChatClearButton: React.FC<{ onClear: () => void }> = ({ onClear }) => (
  <Box sx={{ px: 2, py: 1 }}>
    <Box
      onClick={onClear}
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
);

export default ChatClearButton;
