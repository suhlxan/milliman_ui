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
        className="progress-bar-wrapper"
        sx={{
          background: 'rgba(255, 255, 255, 0.6)',
          borderRadius: '25px',
          padding: '8px',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          className="progress-bar-fill"
          sx={{
            position: 'relative',
          }}
        >
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 20,
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
      </Box>

      {/* Keyframes and shimmer overlay */}
      <style>
        {`
          .progress-bar-fill::before {
            content: '';
            position: absolute;
            top: 0;
            left: -50%;
            width: 200%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: progress-shine 2s infinite;
            pointer-events: none;
          }

          @keyframes glowMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes progress-shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingBar;
 