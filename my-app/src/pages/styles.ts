// src/pages/styles.ts

import { SxProps } from '@mui/material';
import { theme } from '../components/ThemeProvider/theme';

export const chatbotToggleButton: SxProps = {
  position: 'fixed',
  bottom: 20,
  left: 20,
  backgroundColor: theme.colors.primaryBlue,
  color: theme.colors.white,
  zIndex: 1000,
  '&:hover': {
    backgroundColor: theme.colors.mediumBlue,
  },
};

export const sectionTitleIcon: SxProps = {
  color: theme.colors.navy,
  marginRight: 1,
};

export const sectionTitleTextClass = 'font-bold';


export const cardAgeBox: SxProps = {
  width: 'fit-content',
  boxShadow: theme.shadows.soft,
  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows.hover,
    transform: 'translateY(-2px)',
  },
  cursor: 'default',
};

export const statPaper: SxProps = {
  p: 4,
  borderRadius: '15px',
  textAlign: 'center',
  bgcolor: theme.colors.grayBlue,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  '&:hover': {
    transform: 'scale(1.15)',
    boxShadow: 6,
  },
};

export const statValue: SxProps = {
  color: theme.colors.cyan,
  fontWeight: 'bold',
};

export const statLabel: SxProps = {
  color: theme.colors.mediumBlue,
  fontWeight: 500,
};

export const resultsSectionIcon: SxProps = {
  color: theme.colors.teal,
  marginRight: 1,
};

export const calendarIcon: SxProps = {
  marginRight: 1,
};

export const getContainerMargin = (
  submitted: boolean,
  isVisible: boolean,
  width: number
) => ({
  marginLeft: submitted && isVisible ? `${width}px` : 0,
});

export const executeButtonClass =
  'bg-gradient-to-r from-brand-primary-blue to-brand-mediumBlue hover:from-brand-mediumBlue hover:to-brand-primary-blue active:scale-95 transition-transform duration-200 shadow-lg rounded-full px-12 py-3 text-white font-semibold';

export const descriptionTextClass = 'text-gray-600 mb-6';

export const contentContainerClass = 'max-w-7xl mx-auto px-4 py-12';

export const resultsTitleClass = 'font-semibold text-brand-black';

export const sectionTitleText = {
  component: 'h2',
  variant: 'h4',
  className: 'font-bold',
};
