// src/components/WorkflowStatusList.tsx
import React from 'react';
import { Box, Typography, CircularProgress, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

type TaskStatus = 'COMPLETE' | 'PROCESSING' | 'WAITING';

interface Task {
  title: string;
  description: string;
  status: TaskStatus;
}

const statusColors: Record<TaskStatus, string> = {
  COMPLETE: '#4caf50',
  PROCESSING: '#ff9800',
  WAITING: '#9e9e9e',
};

const statusBackgrounds: Record<TaskStatus, string> = {
  COMPLETE: 'linear-gradient(135deg, #a5d6a7 0%, #e8f5e9 100%)',
  PROCESSING: '#fffde7',
  WAITING: '#f5f5f5',
};

const getStatusIcon = (status: TaskStatus) => {
  const color = statusColors[status];
  switch (status) {
    case 'COMPLETE':
      return <CheckCircleIcon sx={{ color }} />;
    case 'PROCESSING':
      return <HourglassTopIcon sx={{ color }} />;
    case 'WAITING':
      return <RadioButtonUncheckedIcon sx={{ color }} />;
    default:
      return null;
  }
};

const tasks: Task[] = [
  {
    title: 'Fetching Claims Data',
    description: 'Retrieving medical and pharmacy claims from secure APIs',
    status: 'COMPLETE',
  },
  {
    title: 'Deidentifying Claims Data',
    description: 'Removing personal identifiers while preserving clinical value',
    status: 'PROCESSING',
  },
  {
    title: 'Extracting Claims Fields',
    description: 'Parsing medical codes, NDC numbers, and structured data',
    status: 'WAITING',
  },
  {
    title: 'Extracting Health Entities',
    description: 'Identifying conditions, medications, and risk factors',
    status: 'WAITING',
  },
  {
    title: 'Analyzing Health Trajectory',
    description: 'Computing longitudinal health patterns and trends',
    status: 'WAITING',
  },
  {
    title: 'Generating Summary',
    description: 'Creating comprehensive clinical assessment report',
    status: 'WAITING',
  },
  {
    title: 'Predicting Heart Attack Risk',
    description: 'Running advanced ML risk assessment algorithms',
    status: 'WAITING',
  },
];

const WorkflowStatusList: React.FC = () => {
  return (
    <Box mt={6} p={3} bgcolor="white" borderRadius={3} boxShadow={3}>
      <Typography variant="h6" fontWeight="bold" mb={2} color="primary">
        Workflow Execution Pipeline
      </Typography>
      {tasks.map((task, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="flex-start"
          mb={3}
          p={2}
          borderRadius={2}
          position="relative"
          bgcolor={statusBackgrounds[task.status]}
        >
          {task.status === 'COMPLETE' && (
            <Chip
              label="Completed"
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: '#388e3c',
                color: 'white',
                fontWeight: 'bold',
              }}
            />
          )}
          <Box mr={2} mt={0.5}>
            {getStatusIcon(task.status)}
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {task.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {task.description}
            </Typography>
            {task.status === 'PROCESSING' && (
              <CircularProgress size={16} sx={{ mt: 1, ml: 0.5 }} />
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default WorkflowStatusList;
 