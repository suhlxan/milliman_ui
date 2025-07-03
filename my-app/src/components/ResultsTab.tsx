// src/components/ResultsTab.tsx
import React, { useState } from 'react';
import { Tabs, Tab, Box, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const labels = ['MCID Claims', 'Medical Claims', 'Pharmacy Claims'];

export default function ResultsTab() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(true);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setOpen(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Tab labels */}
      <Box className="border-b border-brand-gray-light mb-4">
        <Tabs
          value={value}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ style: { backgroundColor: '#005BB5', height: '2px' } }}
          sx={{ '& .MuiTabs-flexContainer': { justifyContent: 'flex-start' } }}
        >
          {labels.map((label, idx) => (
            <Tab
              key={label}
              label={label}
              className={`pb-2 text-h6 transition-colors duration-200 ${
                value === idx
                  ? 'text-brand-blacks font-semibold'
                  : 'text-brand-primary-blue hover:text-brand-blacks'
              }`}
            />
          ))}
        </Tabs>
      </Box>

      {/* Toggle and Content Box */}
      <Box className="flex items-start">
        {/* Arrow toggle aligned with box */}
        <IconButton
          onClick={() => setOpen(o => !o)}
          className="mt-2 mr-2"
          size="small"
        >
          {open ? <ExpandMoreIcon className="text-brand-cyan" /> : <ChevronRightIcon className="text-brand-cyan" />}
        </IconButton>

        {/* Collapsible content box for API results */}
        <Collapse in={open} unmountOnExit sx={{ flexGrow: 1 }}>
          <Box className="bg-white rounded-2xl shadow-lg p-8">
            {/* Results for "${labels[value]}" will appear here */}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
