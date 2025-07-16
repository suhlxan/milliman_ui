// src/components/Chatbot/styles.ts

import { SxProps } from '@mui/material';
import { theme } from '../../components/ThemeProvider/theme';

// Main chatbot container panel

export const chatPanelContainer = (width: number = 350): SxProps => ({
  position: 'fixed',
  top: 0,
  left: 0,
  opacity: 1,
  width: width,
  height: '100%',
  backgroundColor: theme.colors.white,
  boxShadow: 6,
  zIndex: 1100,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',

  // Custom scrollbar
  '&::-webkit-scrollbar': {
    width: '0px',
    transition: 'width 0.3s ease-in-out',
  },
  '&:hover::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.colors.grayLight,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.colors.grayMedium,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.colors.gray,
  },
});

// Chat messages scrollable area
export const chatMessagesContainer: SxProps = {
  flex: 1,
  px: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

// Empty state message
export const emptyChatMessage: SxProps = {
  mt: 2,
  textAlign: 'center',
  color: 'text.secondary',
};

// Separator line
export const separatorLine: SxProps = {
  height: '1px',
  backgroundColor: theme.colors.grayLight,
  my: 2,
};
