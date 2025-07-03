import React from 'react';
import { Box, LinearProgress } from '@mui/material';

interface LoadingBarProps {
  progress: number;
  className?: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ progress, className = '' }) => {
  return (
    <Box className={`mt-12 ${className}`}>
      <Box
        className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl overflow-hidden"
        sx={{
          height: 36,
          mx: 'auto',
          position: 'relative',
        }}
      >
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 36,
            borderRadius: 2,
            backgroundColor: 'transparent',
            '& .MuiLinearProgress-bar': {
              animation: 'glowMove 2s infinite linear',
              background: 'linear-gradient(270deg, #e01cd5, #1CB5E0, #e01cd5)',
              backgroundSize: '400% 400%',
              boxShadow: '0 0 10px #1CB5E0, 0 0 20px #e01cd5',
            },
          }}
        />
      </Box>

      {/* Glowing animation keyframes */}
      <style>
        {`
          @keyframes glowMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingBar;
