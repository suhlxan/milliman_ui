// components/chatbot/ChatSuggestions.tsx

import React from 'react';
import { Box } from '@mui/material';

/**
 * ChatSuggestions component
 * -------------------------------------------
 * Displays a row of quick-reply suggestion chips.
 * 
 * Design notes:
 * - In the future, these suggestions will come from the backend
 *   (e.g., “top intents” endpoint).  For now, they are hard-coded.
 * - The parent supplies an `onSelect` callback so the chosen text
 *   can be inserted into the input field or sent directly.
 */
const ChatSuggestions: React.FC<{ onSelect: (text: string) => void }> = ({ onSelect }) => {
  // TODO: Replace with dynamic suggestions from API when available.
  const suggestions = [
    '👋 Hello! I can answer questions about the claims data analysis. Ask me anything!',
    '💡 Special Feature: Ask about heart attack risk and I will provide both ML model predictions and comprehensive LLM analysis for comparison!',
    '🎨 Try: Ask me to "show medication timeline" or "generate risk dashboard" for visualizations!',
  ];

  return (
    <Box
      sx={{
        px: 2,
        pb: 1,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      {suggestions.map((suggestion) => (
        <Box
          key={suggestion}
          onClick={() => onSelect(suggestion)}      // notify parent of selection
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
  );
};

export default ChatSuggestions;
 