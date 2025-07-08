//component/ChatInputBar.tsx
import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface ChatInputBarProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

const ChatInputBar: React.FC<ChatInputBarProps> = ({ value, onChange, onSend }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSend();
  };

  return (
    <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
      <TextField
        placeholder="Ask me about your claims..."
        fullWidth
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SendIcon
                sx={{ color: '#1355E9', cursor: 'pointer' }}
                onClick={onSend}
              />
            </InputAdornment>
          ),
          sx: {
            borderRadius: 3,
            bgcolor: '#f9f9f9',
          },
        }}
      />
    </Box>
  );
};

export default ChatInputBar;
