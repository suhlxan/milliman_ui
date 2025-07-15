// components/LoadingBar.tsx

import React from 'react';
import { Box, LinearProgress } from '@mui/material';

// Props for the LoadingBar component
interface LoadingBarProps {
  progress: number;        // Current progress (0–100)
  className?: string;      // Optional custom class for positioning
}

/**
 * LoadingBar Component
 * ------------------------------------------------------------------------------
 * A stylized progress bar with glow and shimmer effects.
 * Currently uses a fixed progress value, but designed for future integration
 * with live API updates (e.g., to reflect step-by-step workflow loading).
 */
const LoadingBar: React.FC<LoadingBarProps> = ({ progress, className = '' }) => {
  return (
    <Box className={`mt-12 ${className}`}>
      {/* Outer container with semi-transparent background and padding */}
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
        {/* Wrapper for the actual LinearProgress component */}
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

      {/* Shimmer and animation keyframes injected inline for flexibility */}
      <style>
        {`
          /* Shimmer overlay pass on top of the progress bar */
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

          /* Gradient animation that loops background movement */
          @keyframes glowMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* White light shimmer moving across the bar */
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
