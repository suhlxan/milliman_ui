//components/AdvancedWorkflowContainer.tsx
import { Box } from '@mui/material';
import React from 'react';

// In AdvancedWorkflowContainer.tsx
const AdvancedWorkflowContainer = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Box
        className="advanced-workflow-container"
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #e8f0fe 0%, #f3e5f5 25%, #e1f5fe 50%, #f1f8e9 75%, #fff8e1 100%)',
          padding: '3rem',
          borderRadius: '25px',
          margin: '2rem 0',
          color: '#2c3e50',
          boxShadow:
            '0 25px 50px rgba(52, 152, 219, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          border: '2px solid rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {children}
      </Box>

      <style>
        {`
          .advanced-workflow-container::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
            pointer-events: none;
            z-index: 0;
          }

          .advanced-workflow-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.4) 50%, transparent 70%);
            animation: shimmer 3s ease-in-out infinite;
            pointer-events: none;
            z-index: 0;
          }

          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes shimmer {
            0% { background-position: -100% 0; }
            100% { background-position: 100% 0; }
          }
        `}
      </style>
    </>
  );
};


export default AdvancedWorkflowContainer;
 