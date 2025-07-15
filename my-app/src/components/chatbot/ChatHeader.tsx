//components/chatbot/ChatHeader.tsx
import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * ChatHeader component
 * Renders the title bar of the chatbot panel, including the assistant's name
 * and a close button that triggers the `onClose` callback when clicked.
 */
const ChatHeader: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
  <Box
    sx={{
      pt: 4,
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
    <IconButton onClick={onClose}>
      <CloseIcon />
    </IconButton>
  </Box>
);

export default ChatHeader;
